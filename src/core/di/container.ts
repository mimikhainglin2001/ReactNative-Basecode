import { container } from "tsyringe";

import { AuthApi } from "@/infrastructure/api/auth.api";
import { AuthRefreshApi } from "@/infrastructure/api/auth-refresh.api";

import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository.impl";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth.repository.impl";

import { LoginUseCase } from "@/domain/usecases/login.usecase";
import { RegisterUseCase } from "@/domain/usecases/register.usecase";
import { VerifyEmailUseCase } from "@/domain/usecases/verifyemail.usecase";
import { ResendVerificationUseCase } from "@/domain/usecases/resendverification.usecase";
import { ForgotPasswordUseCase } from "@/domain/usecases/forgotpassword.usecase";
import { ResendForgotPasswordUseCase } from "@/domain/usecases/resendforgotpassword.usecase";
import { VerifyForgotPasswordUseCase } from "@/domain/usecases/verifyforgotpassword.usecase";
import { ResetPasswordUseCase } from "@/domain/usecases/resetpassword.usecase";

import type { IUserRepository } from "@/domain/repositories/user.repository";
import type { AuthRepository } from "@/domain/repositories/auth.repository";

import { TokenManager } from "@/auth/token/TokenManager";
import type { ITokenManager } from "@/auth/token/ITokenManager";

import { TokenRefreshService } from "@/auth/services/token-refresh.service";
import { TokenRefreshCoordinator } from "@/auth/services/token-refresh-coordinator";
import { GetCurrentUserUseCase } from "@/domain/usecases/get-current-user.usecase";

import { ProfileViewModel } from "@/presentation/viewmodels/ProfileViewModel";
import { LoginViewModel } from "@/presentation/viewmodels/LoginViewModel";
import { RegisterViewModel } from "@/presentation/viewmodels/RegisterViewModel";
import { AuthService } from "@/auth/services/auth.service";

/*
 * API
 */
container.register("AuthApi", {
  useClass: AuthApi,
});

container.register("AuthRefreshApi", {
  useClass: AuthRefreshApi,
});

/*
 * Repositories
 */
container.register<IUserRepository>("IUserRepository", {
  useClass: UserRepositoryImpl,
});

container.register<AuthRepository>("IAuthRepository", {
  useClass: AuthRepositoryImpl,
});

/*
 * Auth Service
 */
container.register("AuthService", {
  useClass: AuthService,
});

/*
 * Token
 */
container.register<ITokenManager>("ITokenManager", {
  useClass: TokenManager,
});

/*
 * Use Cases
 */
container.register("LoginUseCase", {
  useClass: LoginUseCase,
});

container.register("RegisterUseCase", {
  useClass: RegisterUseCase,
});

container.register("VerifyEmailUseCase", {
  useClass: VerifyEmailUseCase,
});

container.register("ResendVerificationUseCase", {
  useClass: ResendVerificationUseCase,
});

container.register("ForgotPasswordUseCase", {
  useClass: ForgotPasswordUseCase,
});

container.register("ResendForgotPasswordUseCase", {
  useClass: ResendForgotPasswordUseCase,
});

container.register("VerifyForgotPasswordUseCase", {
  useClass: VerifyForgotPasswordUseCase,
});

container.register("ResetPasswordUseCase", {
  useClass: ResetPasswordUseCase,
});

container.register("GetCurrentUserUseCase", {
  useClass: GetCurrentUserUseCase,
});

/* * ViewModels */
container.register("LoginViewModel", {
  useClass: LoginViewModel,
});

container.register("RegisterViewModel", {
  useClass: RegisterViewModel,
});

container.register("ProfileViewModel", {
  useClass: ProfileViewModel,
});

/*
 * Token refresh
 */
container.register("TokenRefreshService", {
  useClass: TokenRefreshService,
});

container.register("TokenRefreshCoordinator", {
  useClass: TokenRefreshCoordinator,
});

/*
 * Resolve Use Cases
 */
export const loginUseCase = container.resolve<LoginUseCase>("LoginUseCase");

export const registerUseCase =
  container.resolve<RegisterUseCase>("RegisterUseCase");

export const verifyEmailUseCase =
  container.resolve<VerifyEmailUseCase>("VerifyEmailUseCase");

export const resendVerificationUseCase =
  container.resolve<ResendVerificationUseCase>("ResendVerificationUseCase");

export const forgotPasswordUseCase = container.resolve<ForgotPasswordUseCase>(
  "ForgotPasswordUseCase",
);

export const resendForgotPasswordUseCase =
  container.resolve<ResendForgotPasswordUseCase>("ResendForgotPasswordUseCase");

export const verifyForgotPasswordUseCase =
  container.resolve<VerifyForgotPasswordUseCase>("VerifyForgotPasswordUseCase");

export const resetPasswordUseCase = container.resolve<ResetPasswordUseCase>(
  "ResetPasswordUseCase",
);

export const profileViewModel =
  container.resolve<ProfileViewModel>("ProfileViewModel");

export default container;
