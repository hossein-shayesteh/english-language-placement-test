"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { testResultSchema } from "@/lib/actions/create-test-result/schema";
import { InputType, ReturnType } from "@/lib/actions/create-test-result/types";
import { createAction } from "@/lib/create-action";
import prisma from "@/lib/prisma";

const handler = async (data: InputType): Promise<ReturnType> => {
  // Get the current user session
  const session = await auth();
  if (!session?.user?.email)
    return { error: "You must be logged in to submit test results" };

  // Get the user from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return { error: "User not found" };

  const { score, level, answers } = data;

  let testResult;

  try {
    testResult = await prisma.testResult.create({
      data: {
        userId: user.id,
        score,
        level,
        answers,
      },
    });
  } catch (e) {
    const error = e as Error;
    return { error: error.message || "Failed to create invoice" };
  }

  return {
    data: testResult,
    message: "test result",
  };
};

export const createTestResult = createAction(testResultSchema, handler);
