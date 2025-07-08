"use client";

import { Suspense, useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getTestResults } from "@/lib/test-result-services";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TestResult {
  id: string;
  score: number;
  level: string;
  createdAt: Date;
}

const ResultsPage = () => {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
};
export default ResultsPage;

const Results = () => {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  const level = searchParams.get("level");
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch test history
    const fetchTestHistory = async () => {
      try {
        const response = await getTestResults();
        if (response) {
          setTestHistory(response);
        }
      } catch (error) {
        console.error("Error fetching test history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestHistory().then();
  }, []);

  const getLevelDescription = (level: string) => {
    switch (level) {
      case "A1-A2":
        return "Beginner to Elementary level. You can understand and use familiar everyday expressions and very basic phrases.";
      case "B1-B2":
        return "Intermediate to Upper Intermediate level. You can deal with most situations likely to arise while traveling in an area where the language is spoken.";
      case "C1-C2":
        return "Advanced to Proficiency level. You can express yourself fluently and spontaneously without much obvious searching for expressions.";
      default:
        return "Your English level has been assessed.";
    }
  };

  return (
    <div className="animate-fade-in container mx-auto max-w-3xl py-8">
      {score && level && (
        <Card className="mb-8 overflow-hidden py-0">
          <div className="text-primary-foreground bg-[#30bde8] p-6">
            <h2 className="text-xl font-semibold text-[#111618]">
              Current Test Result
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-medium">Your Score:</span>
              <span className="text-lg font-bold">{score}</span>
            </div>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-medium">Your Level:</span>
              <span className="bg-primary/10 text-primary rounded-full px-4 py-1 font-semibold">
                {level}
              </span>
            </div>
            <p className="bg-muted text-muted-foreground mb-6 rounded-lg p-4">
              {getLevelDescription(level)}
            </p>
            <div className="flex justify-end">
              <Link href="/test">
                <Button>Take Test Again</Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      <h2 className="mb-4 text-xl font-semibold">Test History</h2>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-pulse">Loading test history...</div>
        </div>
      ) : testHistory.length > 0 ? (
        <div className="space-y-4">
          {testHistory.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Level: </span>
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-sm font-medium">
                      {result.level}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Score: </span>
                    <span>{result.score}</span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-muted-foreground p-6 text-center">
          No previous test results found.
        </Card>
      )}
    </div>
  );
};
