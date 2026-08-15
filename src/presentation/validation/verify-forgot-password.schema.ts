import { z } from "zod";

export const verifyForgotPasswordSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Please enter the 6-digit verification code."),
});

export type VerifyForgotPasswordFormData = z.infer<
  typeof verifyForgotPasswordSchema
>;
