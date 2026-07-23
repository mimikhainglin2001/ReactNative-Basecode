import { container } from "tsyringe";

import { AuthApi } from "@/infrastructure/api/auth.api";

import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository.impl";

import { LoginUseCase } from "@/domain/usecases/login.usecase";
import { RegisterUseCase } from "@/domain/usecases/register.usecase";

import { IUserRepository } from "@/domain/repositories/user.repository";

container.register("IAuthApi", { useClass: AuthApi });
container.register<IUserRepository>("IUserRepository", { useClass: UserRepositoryImpl });
container.register("LoginUseCase", { useClass: LoginUseCase });
container.register("RegisterUseCase", { useClass: RegisterUseCase });

export const loginUseCase = container.resolve<LoginUseCase>("LoginUseCase");
export const registerUseCase = container.resolve<RegisterUseCase>("RegisterUseCase");