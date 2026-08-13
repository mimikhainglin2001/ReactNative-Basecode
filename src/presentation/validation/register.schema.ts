import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(3, "Name must be at least 3 characters"),

  email: z.string().trim().email("Invalid email"),

  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export type RegisterForm = z.infer<typeof registerSchema>;
