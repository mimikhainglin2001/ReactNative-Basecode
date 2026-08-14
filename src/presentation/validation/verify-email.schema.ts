import { z } from "zod";

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Please enter the 6-digit verification code."),
});

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
