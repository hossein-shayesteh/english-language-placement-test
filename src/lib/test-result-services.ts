"use server";

import { auth } from "@/auth";

import prisma from "@/lib/prisma";

export const getTestResults = async () => {
  const session = await auth();
  if (!session?.user?.email)
    throw new Error("You must be logged in to view test results");

  // Get the user from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");

  // Get the user's test results
  return prisma.testResult.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
};
