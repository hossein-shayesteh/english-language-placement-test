"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAction } from "@/hooks/use-action";

import { createTestResult } from "@/lib/actions/create-test-result";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
}

interface QuestionGroup {
  beginner_A1_A2: Question[];
  intermediate_B1_B2: Question[];
  advanced_C1_C2: Question[];
}

export default function TestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionGroup | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"next" | "prev">(
    "next",
  );

  // Load questions from JSON file
  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error loading questions:", error));
  }, []);

  const { execute: executeCreateTestResult } = useAction(createTestResult, {
    onSuccess: async (data) => {
      router.push(`/results?score=${data.score}&level=${data.level}`);
    },
    onError: async (err) => {
      console.error("Error loading questions:", err);
    },
  });

  if (!questions) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-2xl">Loading questions...</div>
      </div>
    );
  }

  const allQuestions = [
    ...questions.beginner_A1_A2,
    ...questions.intermediate_B1_B2,
    ...questions.advanced_C1_C2,
  ];

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  const handleNext = async () => {
    if (!selectedAnswer) return;

    // Save the answer
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer,
    }));

    if (currentQuestionIndex < allQuestions.length - 1) {
      setAnimationDirection("next");
      setIsAnimating(true);

      // Wait for animation to complete before changing question
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnimating(false);
      }, 500);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setAnimationDirection("prev");
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setSelectedAnswer(
          answers[allQuestions[currentQuestionIndex - 1].id] || null,
        );
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleSubmit = async () => {
    // Calculate score
    let score = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = allQuestions.find((q) => q.id === questionId);
      if (question && question.correct_answer === answer) {
        score++;
      }
    });

    // Determine level based on score
    let level: "A1-A2" | "B1-B2" | "C1-C2" = "A1-A2";
    const percentage = (score / allQuestions.length) * 100;

    if (percentage >= 80) {
      level = "C1-C2";
    } else if (percentage >= 60) {
      level = "B1-B2";
    }

    await executeCreateTestResult({
      score,
      level,
      answers,
    });
  };

  const getAnimationClass = () => {
    if (!isAnimating) return "";

    return animationDirection === "next"
      ? "animate-slide-out-left"
      : "animate-slide-out-right";
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="mb-8 px-4">
        <h1 className="mb-4 text-2xl font-bold">
          English Language Placement Test
        </h1>
        <Progress value={progress} className="h-2 w-full" />
        <div className="mt-2 text-right text-sm">
          Question {currentQuestionIndex + 1} of {allQuestions.length}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          key={currentQuestionIndex}
          className={`transition-all duration-500 ${isAnimating ? getAnimationClass() : ""}`}
        >
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Choose the correct word to complete the sentence.
              </h2>
              <p className="mt-2 text-lg">{currentQuestion.question}</p>
            </div>

            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={setSelectedAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option}
                  className="hover:bg-muted/50 flex items-center gap-2 rounded-lg border px-2 transition-colors"
                >
                  <RadioGroupItem value={option} id={option} />
                  <Label
                    htmlFor={option}
                    className="flex-grow cursor-pointer py-4"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestionIndex === 0 || isAnimating}
                className="cursor-pointer"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedAnswer || isAnimating}
                className="cursor-pointer"
              >
                {currentQuestionIndex < allQuestions.length - 1
                  ? "Next"
                  : "Submit"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
