import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormData,
} from "@/presentation/validation/login.schema";

export function useLoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onSubmit",

    reValidateMode: "onChange",

    shouldFocusError: true,
  });

  return {
    control: form.control,
    handleSubmit: form.handleSubmit,
    formState: form.formState,
    reset: form.reset,
  };
}
