# EnterpriseRN - Architecture Diagram

## High-Level Layered Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Screens    │  │  Components  │  │  ViewModels  │              │
│  │  (React UI)  │  │  (Button,    │  │  (LoginVM,   │              │
│  │              │  │   Input,     │  │   RegisterVM,│              │
│  │              │  │   Card...)   │  │   etc.)      │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                 │                      │
│         ▼                 ▼                 ▼                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    NAVIGATION (React Navigation)             │  │
│  │  RootNavigator → AuthNavigator / AppNavigator (Bottom Tabs)  │  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DOMAIN LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Entities    │  │ Repositories │  │  Use Cases   │              │
│  │  (User,      │  │ (Interfaces) │  │  (Login,     │              │
│  │   AuthResp)  │  │              │  │   Register,  │              │
│  │              │  │ IAuthRepo    │  │   Verify,    │              │
│  │              │  │ IUserRepo    │  │   Forgot,    │              │
│  │              │  │              │  │   Reset...)  │              │
│  └──────────────┘  └──────┬───────┘  └──────┬───────┘              │
└───────────────────────────┼────────────────┼────────────────────────┘
                            │                │
                            ▼                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   API        │  │ Repositories │  │   Storage    │              │
│  │ (AuthApi,    │  │ (Impl)       │  │ (SecureStore)│              │
│  │  RefreshApi) │  │              │  │              │              │
│  │              │  │ AuthRepoImpl │  │ TokenManager │              │
│  │              │  │ UserRepoImpl │  │              │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       CORE / CROSS-CUTTING                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ DI Container │  │  Network     │  │   Auth       │              │
│  │ (tsyringe)   │  │ (ApiClient,  │  │ (AuthService,│              │
│  │              │  │  Refresh,    │  │  TokenRefresh│              │
│  │              │  │  Errors)     │  │  Coordinator)│              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Login Request Flow (Sequence Diagram)

```
User          LoginScreen      useLoginForm      LoginViewModel     LoginUseCase    AuthRepository    AuthApi         Server
  │               │                 │                  │                  │                │               │              │
  │──tap Login───▶│                 │                  │                  │                │               │              │
  │               │──validate ─────▶│                  │                  │                │               │              │
  │               │◀──valid data────│                  │                  │                │               │              │
  │               │                 │──handleSubmit───▶│                  │                │               │              │
  │               │                 │                  │──execute()──────▶│                │               │              │
  │               │                 │                  │                  │──login()──────▶│               │              │
  │               │                 │                  │                  │                │──POST /login─▶│              │
  │               │                 │                  │                  │                │◀──200 OK─────│              │
  │               │                 │                  │                  │◀──AuthEntity───│               │              │
  │               │                 │                  │◀──Result.ok─────│                │               │              │
  │               │                 │                  │                  │                │               │              │
  │               │                 │                  │──saveTokens()───▶│                │               │              │
  │               │                 │                  │──saveUser()────▶│                │               │              │
  │               │                 │                  │──store.login()──▶│                │               │              │
  │               │                 │◀──Result.ok(User)│                  │                │               │              │
  │               │◀──navigate──────│                  │                  │                │               │              │
  │               │                 │                  │                  │                │               │              │
```

---

## Dependency Injection Graph (container.ts)

```
┌─────────────────────────────────────────────────────────────────┐
│                        TSYRINGE CONTAINER                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌──────────────────┐    ┌────────────────┐  │
│  │   APIs      │    │  Repositories    │    │  Token Mgmt    │  │
│  │             │    │                  │    │                │  │
│  │ AuthApi ────────▶ IAuthRepository ◀───┤                │  │
│  │             │    │                  │    │ ITokenManager ◀── TokenManager
│  │ AuthRefreshApi    IUserRepository ◀──┤                │    │
│  │             │    │                  │    │ TokenRefreshService
│  └─────────────┘    └──────────────────┘    │ TokenRefreshCoordinator
│                                             └────────────────┘
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    USE CASES (Registered)                 │   │
│  │  LoginUseCase ──────▶ RegisterUseCase ──────▶ VerifyEmail │   │
│  │  ResendVerification ▶ ForgotPassword ──────▶ ResendForgot │   │
│  │  VerifyForgotPwd ─────▶ ResetPassword                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              PRE-RESOLVED EXPORTS (for ViewModels)        │   │
│  │  loginUseCase, registerUseCase, verifyEmailUseCase,       │   │
│  │  resendVerificationUseCase, forgotPasswordUseCase,        │   │
│  │  resendForgotPasswordUseCase, verifyForgotPasswordUseCase,│   │
│  │  resetPasswordUseCase                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Navigation Flow

```
                    ┌─────────────────┐
                    │   App Launch    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  SplashScreen   │
                    │ (loading=true)  │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │ restoreSession()│
                    │ - getAccessToken│
                    │ - getUser()     │
                    │ - store.login() │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │  loading=false  │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                               ▼
     ┌─────────────────┐              ┌─────────────────┐
     │  isLoggedIn?    │              │  isLoggedIn?    │
     │     TRUE        │              │     FALSE       │
     └────────┬────────┘              └────────┬────────┘
              │                               │
              ▼                               ▼
     ┌─────────────────┐              ┌─────────────────┐
     │  AppNavigator   │              │  AuthNavigator  │
     │  (Bottom Tabs)  │              │  (Stack)        │
     │                 │              │                 │
     │ • Profile       │              │ • Login         │
     │ • Notifications │              │ • Register      │
     │ • Settings      │              │ • VerifyEmail   │
     │                 │              │ • ForgotPass    │
     │ LogoutButton    │              │ • VerifyCode    │
     │ (calls logout)  │              │ • ResetPassword │
     └─────────────────┘              └─────────────────┘
```

---

## Token Refresh Flow (Interceptor)

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  API Call   │────▶│  401 Unauthorized│────▶│ TokenRefreshCoord.  │
│  (any req)  │     │  (Access expired)│     │  .handle401()       │
└─────────────┘     └──────────────────┘     └──────────┬──────────┘
                                                         │
                              ┌──────────────────────────┼──────────────────────────┐
                              ▼                          ▼                          ▼
                     ┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
                     │  Refresh Token  │        │  Refresh Token  │        │  Refresh Token  │
                     │     VALID       │        │     EXPIRED     │        │    MISSING      │
                     └────────┬────────┘        └────────┬────────┘        └────────┬────────┘
                              │                          │                          │
                              ▼                          ▼                          ▼
                     ┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
                     │ POST /refresh   │        │  Clear Storage  │        │  Clear Storage  │
                     │ Get new tokens  │        │  store.logout() │        │  store.logout() │
                     │ Retry original  │        │  Navigate Login │        │  Navigate Login │
                     └─────────────────┘        └─────────────────┘        └─────────────────┘
```

---

## Project Structure Tree (Simplified)

```
EnterpriseRN/
├── src/
│   ├── App.tsx                      # Entry point, DI init, RootNavigator
│   ├── index.ts                     # Expo entry
│   │
│   ├── core/                        # 📦 SHARED INFRASTRUCTURE
│   │   ├── di/
│   │   │   └── container.ts         # tsyringe registrations + exports
│   │   ├── network/
│   │   │   ├── api-client.ts        # Axios instance + interceptors
│   │   │   ├── api-client.factory.ts
│   │   │   ├── refresh-client.ts    # Separate client for token refresh
│   │   │   ├── api-error.ts         # ApiError class
│   │   │   └── api-response.ts      # ApiResponse wrapper
│   │   ├── storage/
│   │   │   └── secure-storage.ts    # expo-secure-store wrapper
│   │   ├── utils/
│   │   │   └── result.ts            # Result<T> pattern (Ok/Err)
│   │   └── constants/
│   │       └── app.constants.ts
│   │
│   ├── domain/                      # 🎯 BUSINESS LOGIC (Pure TS)
│   │   ├── entities/
│   │   │   ├── user.entity.ts
│   │   │   └── auth-response.entity.ts
│   │   ├── repositories/
│   │   │   ├── auth.repository.ts   # Interface
│   │   │   └── user.repository.ts   # Interface
│   │   └── usecases/                # 8 Use Cases
│   │       ├── login.usecase.ts
│   │       ├── register.usecase.ts
│   │       ├── verifyemail.usecase.ts
│   │       ├── resendverification.usecase.ts
│   │       ├── forgotpassword.usecase.ts
│   │       ├── resendforgotpassword.usecase.ts
│   │       ├── verifyforgotpassword.usecase.ts
│   │       └── resetpassword.usecase.ts
│   │
│   ├── infrastructure/              # 🔧 IMPLEMENTATIONS
│   │   ├── api/
│   │   │   ├── auth.api.ts          # login, register, verify, forgot, reset
│   │   │   └── auth-refresh.api.ts  # refreshToken endpoint
│   │   └── repositories/
│   │       ├── auth.repository.impl.ts
│   │       └── user.repository.impl.ts
│   │
│   ├── auth/                        # 🔐 AUTH CROSS-CUTTING
│   │   ├── token/
│   │   │   ├── ITokenManager.ts     # Interface
│   │   │   └── TokenManager.ts      # SecureStore impl
│   │   ├── services/
│   │   │   ├── auth.service.ts      # restoreSession, logout
│   │   │   ├── token-refresh.service.ts
│   │   │   └── token-refresh-coordinator.ts
│   │   ├── store/
│   │   │   └── auth.store.ts        # Zustand (isLoggedIn, user)
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── types.ts
│   │
│   └── presentation/                # 🎨 UI LAYER (React Native)
│       ├── navigation/
│       │   ├── RootNavigator.tsx    # Auth check + switch navigator
│       │   ├── AuthNavigator.tsx    # Auth stack (Login, Register...)
│       │   └── AppNavigator.tsx     # Main tabs (Profile, Notif, Settings)
│       ├── screens/
│       │   ├── SplashScreen.tsx
│       │   ├── auth/
│       │   │   ├── LoginScreen.tsx
│       │   │   ├── RegisterScreen.tsx
│       │   │   ├── VerifyEmailScreen.tsx
│       │   │   ├── ForgotPasswordScreen.tsx
│       │   │   ├── VerifyForgotPasswordScreen.tsx
│       │   │   └── ResetPasswordScreen.tsx
│       │   ├── profile/ProfileScreen.tsx
│       │   ├── notification/NotificationScreen.tsx
│       │   └── settings/SettingsScreen.tsx
│       ├── components/
│       │   ├── Button/AppButton.tsx, LogoutButton.tsx
│       │   ├── Input/AppInput.tsx
│       │   ├── Card/AppCard.tsx
│       │   ├── Avatar/AppAvatar.tsx
│       │   ├── Modal/AppModal.tsx
│       │   ├── Header/AppHeader.tsx
│       │   ├── Toast/AppToast.tsx
│       │   ├── Loading/LoadingView.tsx
│       │   ├── Error/AppMessage.tsx
│       │   └── common/AppScreen.tsx, AppText.tsx, AppEmpty.tsx, AppLoader.tsx
│       ├── viewmodels/              # MVVM - One per screen
│       │   ├── LoginViewModel.ts
│       │   ├── RegisterViewModel.ts
│       │   ├── VerifyEmailViewModel.ts
│       │   ├── ForgotPasswordViewModel.ts
│       │   ├── VerifyForgotPasswordViewModel.ts
│       │   └── ResetPasswordViewModel.ts
│       ├── hooks/                   # Form hooks (React Hook Form + Zod)
│       │   ├── useLoginForm.ts
│       │   ├── useRegisterForm.ts
│       │   ├── useVerifyEmailForm.ts
│       │   ├── useVerifyResetCodeForm.ts
│       │   └── useForgotPasswordForm.ts (implied)
│       ├── validation/              # Zod Schemas
│       │   ├── login.schema.ts
│       │   ├── register.schema.ts
│       │   ├── verify-email.schema.ts
│       │   ├── forgot-password.schema.ts
│       │   ├── verify-forgot-password.schema.ts
│       │   └── reset-password.schema.ts
│       └── theme/                   # Design System
│           ├── theme.ts
│           ├── colors.ts
│           ├── typography.ts
│           ├── spacing.ts
│           ├── radius.ts
│           ├── shadow.ts
│           └── icons.ts
│
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── .env.example
├── .env.development
└── AGENTS.md
```