import { Result } from "@/core/utils/result";
import { AuthResponseEntity } from "../entities/auth-response.entity";

export interface RegisterResult {
  verificationId: string;
}

export interface IUserRepository {
  login(email: string, password: string): Promise<Result<AuthResponseEntity>>;
  register(
    name: string,
    email: string,
    password: string,
  ): Promise<Result<RegisterResult>>;
  verifyEmail(
    verificationId: string,
    otp: string,
    email: string,
    password: string,
  ): Promise<Result<AuthResponseEntity>>;
  resendVerification(verificationId: string): Promise<Result<boolean>>;
}
