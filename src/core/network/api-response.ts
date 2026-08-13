export interface ApiMeta {
  requestId?: string;

  startTime?: string;

  status: string;
}

export interface ApiSuccess<T> {
  data: T;

  meta?: ApiMeta;
}

export interface ApiErrorPayload {
  code: string;

  message: string;
}

export interface ApiFailure {
  data: null;

  error: ApiErrorPayload;

  meta?: ApiMeta;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface LoginResponse {
  accessToken: string;

  refreshToken: string;
}

export interface RegisterResponse {
  verificationId: string;

  meta: ApiMeta;
}

export interface CurrentUserResponse {
  id: string;

  email: string;

  name: string;

  createdAt: string;

  updatedAt: string;
}

export interface VerifyEmailResponse {
  userId: string;

  email: string;
}
