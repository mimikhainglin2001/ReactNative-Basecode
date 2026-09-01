import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "@/presentation/validation/register.schema";

export function useRegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
