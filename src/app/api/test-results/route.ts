import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get the current user session
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to view test results" },
        { status: 401 },
      );
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the user's test results
    const testResults = await prisma.testResult.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ testResults });
  } catch (error) {
    console.error("Error fetching test results:", error);
    return NextResponse.json(
      { error: "Failed to fetch test results" },
      { status: 500 },
    );
  }
}
