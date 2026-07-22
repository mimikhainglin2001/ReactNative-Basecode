import { AuthApi } from "@/infrastructure/api/auth.api";

import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository.impl";

import { LoginUseCase } from "@/domain/usecases/login.usecase";

const authApi = new AuthApi();

const userRepository = new UserRepositoryImpl(authApi);

export const loginUseCase = new LoginUseCase(userRepository);
