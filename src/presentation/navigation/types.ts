export type AuthStackParamList = {
  Login: undefined;

  Register: undefined;

  VerifyEmail: {
    verificationId: string;

    email: string;

    password: string;
  };
};

export type AppStackParamList = {
  Main: undefined;
};
