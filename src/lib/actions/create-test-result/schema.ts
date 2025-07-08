import { z } from "zod";

export const testResultSchema = z.object({
  score: z.number().int().min(0),
  level: z.enum(["A1-A2", "B1-B2", "C1-C2"]),
  answers: z.record(z.string()),
});
