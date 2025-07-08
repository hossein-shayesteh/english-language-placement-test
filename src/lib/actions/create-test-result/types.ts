import { TestResult } from "@prisma/client";
import { z } from "zod";

import { testResultSchema } from "@/lib/actions/create-test-result/schema";
import { ActionState } from "@/lib/create-action";

export type InputType = z.infer<typeof testResultSchema>;
export type ReturnType = ActionState<InputType, TestResult>;
