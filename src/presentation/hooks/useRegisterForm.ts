import { useMemo, useState } from "react";

import { useForm, type UseFormReturn } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "@/presentation/validation/register.schema";

import { RegisterViewModel } from "@/presentation/viewmodels/RegisterViewModel";

export type MessageType = "success" | "error" | "warning" | "info";

interface UseRegisterFormReturn extends UseFormReturn<RegisterFormData> {
  loading: boolean;

  message: string;

  messageType: MessageType;

  submit: (
    onSuccess: (verificationId: string, email: string, password: string) => void,
  ) => void;
}

export function useRegisterForm(): UseRegisterFormReturn {
  /*
   * Create ViewModel once.
   */
  const viewModel = useMemo(() => new RegisterViewModel(), []);

  /*
   * Server/general message.
   */
  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<MessageType>("info");

  /*
   * Loading state.
   */
  const [loading, setLoading] = useState(false);

  /*
   * React Hook Form.
   */
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },

    mode: "onSubmit",
  });

  /*
   * Submit registration.
   */
  const submit = (
    onSuccess: (verificationId: string, email: string, password: string) => void,
  ) => {
    /*
     * React Hook Form handles
     * validation before this function.
     */
    form.handleSubmit(async (data) => {
      /*
       * Prevent double submit.
       */
      if (loading) {
        return;
      }

      setLoading(true);

      setMessage("");

      try {
        /*
         * Call ViewModel.
         */
        const result = await viewModel.register(
          data.fullName,
          data.email,
          data.password,
        );

        /*
         * Backend error.
         */
        if (!result.success) {
          setMessage(result.error ?? "Registration failed.");

          setMessageType("error");

          return;
        }

        /*
         * Get verification ID.
         */
        const verificationId = result.data?.verificationId;

        /*
         * Defensive check.
         */
        if (!verificationId) {
          console.error(
            "Registration succeeded without verificationId:",
            result,
          );

          setMessage(
            "Account was created, but email verification could not be started.",
          );

          setMessageType("error");

          return;
        }

        /*
         * Registration successful.
         *
         * Navigation is handled
         * by the screen.
         */
        setMessage(
          "Account created. Check your email for the verification code.",
        );

        setMessageType("success");

        onSuccess(verificationId, data.email, data.password);
      } catch (error) {
        console.error("Register error:", error);

        setMessage("Something went wrong. Please try again.");

        setMessageType("error");
      } finally {
        setLoading(false);
      }
    })();
  };

  return {
    ...form,

    loading,

    message,

    messageType,

    submit,
  };
}
