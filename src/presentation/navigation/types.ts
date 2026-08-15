export type AuthStackParamList = {
  Login: undefined;

  Register: undefined;

  VerifyEmail: {
    verificationId: string;
    email: string;
    password: string;
  };
  ForgotPassword: undefined;

  VerifyResetCode: {
    verificationId: string;
    email: string;
  };

  ResetPassword: {
    resetToken: string;
  };
};

export type AppStackParamList = {
  Main: undefined;
};
