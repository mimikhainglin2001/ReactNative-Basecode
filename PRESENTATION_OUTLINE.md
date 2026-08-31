# EnterpriseRN - Presentation Slide Outline

## 🎯 Presentation Goal
**Duration: 15-20 minutes** | **Audience: Technical team / Stakeholders**

---

## SLIDE 1: Title Slide
```
EnterpriseRN: Clean Architecture React Native App
Expo 54 + TypeScript + Domain-Driven Design

Presenter: [Your Name]
Date: [Date]
```

---

## SLIDE 2: Agenda
1. Project Overview & Tech Stack
2. Architecture Philosophy (Why Clean Architecture?)
3. Folder Structure Deep Dive
4. App Bootstrap & Navigation Flow
5. Dependency Injection & Service Layer
6. **Live Code Trace**: Login Request Flow
7. Token Management & Auto-Refresh
8. Key Patterns & Best Practices
9. Scalability & Testing Benefits
10. Q&A

---

## SLIDE 3: Project Overview
```
📱 EnterpriseRN - Enterprise-Grade React Native Starter

Tech Stack:
├── Framework: Expo 54 (React 19, RN 0.81)
├── Language: TypeScript (strict mode)
├── Navigation: React Navigation 7 (Native Stack + Bottom Tabs)
├── State: Zustand (global) + React Hook Form (forms)
├── Data: TanStack Query 5 (server state)
├── DI: tsyringe (decorator-based)
├── Validation: Zod 4 + @hookform/resolvers
├── Storage: expo-secure-store (encrypted)
├── HTTP: Axios + custom interceptors
└── UI: Custom design system (theme/, components/)

Architecture: Clean Architecture + MVVM + Repository Pattern
```

---

## SLIDE 4: Why Clean Architecture?
```
PROBLEMS WE SOLVE:
❌ Tight coupling between UI and API
❌ Business logic scattered in components
❌ Hard to test (React Native dependencies everywhere)
❌ Difficult to swap API / Storage / Auth providers
❌ Onboarding new devs = "figure it out"

OUR SOLUTION:
✅ Domain layer = pure TypeScript (zero framework deps)
✅ Use Cases = single-responsibility, testable units
✅ Repositories = interfaces in domain, impl in infrastructure
✅ DI Container = centralized, swappable dependencies
✅ ViewModels = UI-agnostic presentation logic
✅ Result Pattern = explicit error handling (no try/catch pyramid)
```

---

## SLIDE 5: Folder Structure - Layered View
```
src/
├── core/                    # 🔧 Shared Infrastructure
│   ├── di/container.ts      # TSyringe registrations (THE wiring diagram)
│   ├── network/             # API client, refresh client, errors
│   ├── storage/             # Secure storage abstraction
│   └── utils/result.ts      # Result<T> = Ok(data) | Err(error)
│
├── domain/                  # 🎯 BUSINESS LOGIC (Pure TS)
│   ├── entities/            # UserEntity, AuthResponseEntity
│   ├── repositories/        # INTERFACES: IAuthRepository, IUserRepository
│   └── usecases/            # 8 UseCases: Login, Register, Verify, Forgot, Reset...
│
├── infrastructure/          # 🏗 IMPLEMENTATIONS
│   ├── api/                 # Axios calls: auth.api, auth-refresh.api
│   └── repositories/        # AuthRepositoryImpl, UserRepositoryImpl
│
├── auth/                    # 🔐 Auth Cross-Cutting Concerns
│   ├── token/               # ITokenManager + TokenManager (SecureStore)
│   ├── services/            # AuthService, TokenRefreshCoordinator
│   ├── store/               # Zustand: isLoggedIn, user
│   └── hooks/useAuth.ts
│
└── presentation/            # 🎨 UI LAYER
    ├── navigation/          # Root → Auth / App Navigator
    ├── screens/             # Screens (dumb, delegate to ViewModels)
    ├── components/          # Reusable UI primitives
    ├── viewmodels/          # MVVM: LoginVM, RegisterVM... (orchestrate UseCases)
    ├── hooks/               # Form hooks (RHF + Zod)
    ├── validation/          # Zod schemas
    └── theme/               # Design system tokens
```

---

## SLIDE 6: App Bootstrap (App.tsx)
```tsx
// App.tsx - The Composition Root
import "reflect-metadata";           // Required for tsyringe decorators

import { initializeApiClient } from "./core/network/api-client";
import { TokenRefreshCoordinator } from "./auth/services/token-refresh-coordinator";
import type { ITokenManager } from "./auth/token/ITokenManager";
import container from "./core/di/container";

// 1. Resolve core services from DI
const tokenManager = container.resolve<ITokenManager>("ITokenManager");
const tokenRefreshCoordinator = container.resolve<TokenRefreshCoordinator>("TokenRefreshCoordinator");

// 2. Initialize Axios with interceptors
initializeApiClient(tokenManager, tokenRefreshCoordinator);

// 3. Render
export default function App() {
  return (
    <>
      <RootNavigator />
      <Toast />  // Global toast (react-native-toast-message)
    </>
  );
}
```

---

## SLIDE 7: Navigation Flow
```
RootNavigator.tsx
├── SplashScreen (while loading)
│   └── useEffect: AuthService.restoreSession()
│       ├── tokenManager.getAccessToken()
│       ├── tokenManager.getUser()
│       └── useAuthStore.getState().login(user)
│
├── isLoggedIn = TRUE  →  AppNavigator (Bottom Tabs)
│   ├── ProfileScreen
│   ├── NotificationScreen
│   ├── SettingsScreen
│   └── LogoutButton → AuthService.logout()
│
└── isLoggedIn = FALSE → AuthNavigator (Stack)
    ├── LoginScreen
    ├── RegisterScreen
    ├── VerifyEmailScreen
    ├── ForgotPasswordScreen
    ├── VerifyForgotPasswordScreen
    └── ResetPasswordScreen
```

---

## SLIDE 8: Dependency Injection (container.ts)
```typescript
// container.ts - Single Source of Truth for Wiring

// APIs
container.register("AuthApi", { useClass: AuthApi });
container.register("AuthRefreshApi", { useClass: AuthRefreshApi });

// Repositories (Interface → Impl)
container.register<IUserRepository>("IUserRepository", { useClass: UserRepositoryImpl });
container.register<AuthRepository>("IAuthRepository", { useClass: AuthRepositoryImpl });

// Token Management
container.register<ITokenManager>("ITokenManager", { useClass: TokenManager });

// Use Cases (8 total)
container.register("LoginUseCase", { useClass: LoginUseCase });
container.register("RegisterUseCase", { useClass: RegisterUseCase });
// ... VerifyEmail, ResendVerification, ForgotPassword, etc.

// Token Refresh
container.register("TokenRefreshService", { useClass: TokenRefreshService });
container.register("TokenRefreshCoordinator", { useClass: TokenRefreshCoordinator });

// Pre-resolved exports for ViewModels
export const loginUseCase = container.resolve<LoginUseCase>("LoginUseCase");
export const registerUseCase = container.resolve<RegisterUseCase>("RegisterUseCase");
// ...
```

---

## SLIDE 9: **LIVE TRACE** - Login Request Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        USER TAPS "LOGIN"                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  1. LoginScreen.tsx                                                         │
│     const { handleSubmit } = useLoginForm();                                │
│     handleSubmit((data) => loginViewModel.login(data.email, data.password)) │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  2. useLoginForm.ts (React Hook Form + Zod)                                 │
│     resolver: zodResolver(loginSchema)  // Validates BEFORE submit          │
│     Returns: { control, handleSubmit, formState, reset }                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  3. LoginViewModel.ts                                                       │
│     async login(email, password): Promise<Result<UserEntity>> {             │
│       const result = await loginUseCase.execute(email, password);  // ← USE CASE │
│       if (!result.success) return Result.fail(result.error);                │
│       await tokenManager.saveTokens(auth.accessToken, auth.refreshToken);   │
│       await tokenManager.saveUser(auth.user);                               │
│       useAuthStore.getState().login(auth.user);  // ← GLOBAL STATE          │
│       return Result.ok(auth.user);                                          │
│     }                                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  4. LoginUseCase.ts (Domain - Pure TS)                                      │
│     @injectable()                                                           │
│     class LoginUseCase {                                                    │
│       constructor(@inject("IUserRepository") private repo: IUserRepository) {}│
│       execute(email, password) { return this.repo.login(email, password); } │
│     }                                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  5. AuthRepositoryImpl.ts (Infrastructure)                                  │
│     async login(email, password): Promise<Result<AuthResponseEntity>> {     │
│       return authApi.login(email, password);  // ← AXIOS CALL               │
│     }                                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  6. AuthApi.ts (Axios)                                                      │
│     async login(email, password) {                                          │
│       const res = await api.post("/auth/login", { email, password });       │
│       return Result.ok(res.data);  // → AuthResponseEntity                  │
│     }                                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  7. SERVER → 200 OK { accessToken, refreshToken, user }                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
         ┌──────────────────────────┴──────────────────────────┐
         │           RESPONSE BUBBLES BACK UP                  │
         │  Api → Repo → UseCase → ViewModel → Store → Screen  │
         └─────────────────────────────────────────────────────┘
```

---

## SLIDE 10: Token Management & Auto-Refresh
```
TOKEN LIFECYCLE:
┌─────────────────────────────────────────────────────────────────────┐
│ TokenManager (ITokenManager)                                        │
│ ├── saveTokens(access, refresh)     → expo-secure-store (encrypted) │
│ ├── getAccessToken()                → string | null                 │
│ ├── getRefreshToken()               → string | null                 │
│ ├── getUser()                       → UserEntity | null             │
│ ├── saveUser(user)                  → secure store                  │
│ └── clear()                         → wipe all auth data            │
└─────────────────────────────────────────────────────────────────────┘

AUTO-REFRESH INTERCEPTOR (api-client.ts):
┌─────────────────────────────────────────────────────────────────────┐
│ axios.interceptors.response.use(                                    │
│   (response) => response,                                           │
│   async (error) => {                                                │
│     if (error.response?.status === 401 && !error.config._retry) {  │
│       error.config._retry = true;                                   │
│       return tokenRefreshCoordinator.handle401(error.config);      │
│     }                                                               │
│     return Promise.reject(error);                                   │
│   }                                                                 │
│ );                                                                  │
└─────────────────────────────────────────────────────────────────────┘

TokenRefreshCoordinator.handle401():
1. Check if refresh token exists
2. Call AuthRefreshApi.refreshToken() via SEPARATE axios instance (no interceptors!)
3. On success: save new tokens → retry original request
4. On fail/expired: clear storage → store.logout() → navigate to Login
5. Prevents race conditions: queues requests during refresh
```

---

## SLIDE 11: Key Patterns in Codebase
```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. RESULT PATTERN (core/utils/result.ts)                            │
│    type Result<T> = { success: true; data: T }                     │
│                | { success: false; error: string }                 │
│    → No exceptions for expected failures (validation, 401, 404)    │
│    → Forces explicit handling at call sites                         │
├─────────────────────────────────────────────────────────────────────┤
│ 2. REPOSITORY PATTERN                                               │
│    Domain:     interface IUserRepository { login(): Promise<Result> }│
│    Infra:      class UserRepositoryImpl implements IUserRepository  │
│    → Swap API → Mock for tests → Change DB without touching domain  │
├─────────────────────────────────────────────────────────────────────┤
│ 3. USE CASE PATTERN                                                 │
│    class LoginUseCase { execute(email, pwd) }  // Single action     │
│    → Testable in isolation (mock repository)                        │
│    → Reusable: CLI, Web, Mobile, Background jobs                    │
├─────────────────────────────────────────────────────────────────────┤
│ 4. MVVM (Model-View-ViewModel)                                      │
│    Screen (View) → ViewModel → UseCase → Repository → API           │
│    → ViewModel holds NO React state (pure logic)                    │
│    → Easy to unit test, swap UI framework                           │
├─────────────────────────────────────────────────────────────────────┤
│ 5. DEPENDENCY INJECTION (tsyringe)                                  │
│    @injectable() class LoginUseCase {                               │
│      constructor(@inject("IUserRepository") private repo) {}        │
│    }                                                                │
│    → Decouples construction from usage                              │
│    → Singleton/Transient scopes configurable                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## SLIDE 12: Adding a New Feature (e.g., "Change Password")
```
STEP-BY-STEP (5 files, ~5 minutes):

1. DOMAIN (pure TS, no imports from presentation/infrastructure)
   ├── domain/entities/change-password.entity.ts (optional)
   ├── domain/repositories/auth.repository.ts  → add changePassword()
   └── domain/usecases/changepassword.usecase.ts
       @injectable() class ChangePasswordUseCase {
         constructor(@inject("IAuthRepository") private repo) {}
         execute(currentPwd, newPwd) { return this.repo.changePassword(currentPwd, newPwd); }
       }

2. INFRASTRUCTURE
   ├── infrastructure/api/auth.api.ts          → add changePassword() call
   └── infrastructure/repositories/auth.repository.impl.ts
       async changePassword(current, new) { return authApi.changePassword(current, new); }

3. DI REGISTRATION (container.ts)
   container.register("ChangePasswordUseCase", { useClass: ChangePasswordUseCase });
   export const changePasswordUseCase = container.resolve("ChangePasswordUseCase");

4. PRESENTATION
   ├── presentation/viewmodels/ChangePasswordViewModel.ts
   ├── presentation/hooks/useChangePasswordForm.ts (Zod + RHF)
   └── presentation/screens/auth/ChangePasswordScreen.tsx

5. NAVIGATION
   AuthNavigator.tsx → add ChangePasswordScreen to stack

✅ DONE - Zero changes to existing working code
```

---

## SLIDE 13: Testing Strategy
```
UNIT TESTS (Jest + tsyringe mocking):
├── Use Cases (LoginUseCase, RegisterUseCase...)
│   └── Mock IUserRepository / IAuthRepository
├── ViewModels (LoginViewModel...)
│   └── Mock UseCases + TokenManager + AuthStore
└── TokenManager
    └── Mock expo-secure-store

INTEGRATION TESTS:
├── Repository Implementations
│   └── Mock AuthApi (MSW or axios-mock-adapter)
└── AuthService.restoreSession()

E2E (Detox / Maestro):
├── Login → Profile → Logout flow
├── Token refresh on 401
└── Forgot password → Reset flow

TEST PYRAMID:
       ▲
      / \     E2E (5-10 scenarios)
     /---\    Integration (repos, services)
    /-----\   Unit (use cases, view models, utils) ← MOST TESTS HERE
```

---

## SLIDE 14: Scalability & Maintainability
```
SCALING HORIZONTALLY (Team Growth):
├── Feature Teams own vertical slices:
│   ├── Auth Team: domain/usecases/*auth*, infrastructure/api/auth.*
│   ├── Profile Team: domain/usecases/profile*, presentation/screens/profile/
│   └── Settings Team: ...
├── Shared Core (core/, auth/) maintained by Platform Team
└── Design System (presentation/theme/, components/) shared

SCALING VERTICALLY (Feature Complexity):
├── Add Domain Events → Event Bus → Decoupled side effects
├── Add CQRS → Separate Read/Write models for complex queries
├── Add Offline-First → Sync Engine in core/ (domain stays same)
└── Add Micro-Frontends → Each navigator = separate bundle

MIGRATION PATHS:
├── Expo → Bare React Native: Only presentation/ changes
├── REST → GraphQL: Only infrastructure/api/ changes
├── Zustand → Redux/Recoil: Only auth/store/ + ViewModels change
├── React Navigation → Expo Router: Only presentation/navigation/ changes
└── tsyringe → manual DI: Only container.ts changes
```

---

## SLIDE 15: Project Health Metrics
```
CODE QUALITY:
├── TypeScript: strict mode ✅
├── ESLint + Prettier: configured ✅
├── No circular dependencies (enforced by layer rules) ✅
├── Result pattern eliminates unhandled promise rejections ✅

PERFORMANCE:
├── Bundle: Code-split by navigator (Auth vs App)
├── TanStack Query: Caching, deduping, background refetch
├── React Hook Form: Minimal re-renders (controlled inputs)
├── SecureStore: Async, non-blocking

SECURITY:
├── Tokens in SecureStore (Keychain/Keystore)
├── Auto-refresh prevents token exposure in logs
├── No secrets in code (.env for config)
└── HTTPS enforced in api-client

DEVELOPER EXPERIENCE:
├── Hot reload (Expo)
├── Type-safe navigation (route params)
├── Type-safe API (entities match backend)
├── One-command setup: npm install && npm start
```

---

## SLIDE 16: Summary & Takeaways
```
✅ CLEAN ARCHITECTURE works in React Native
✅ Domain layer = your business asset (framework-agnostic)
✅ DI Container = explicit dependency graph (no magic)
✅ Use Cases = living documentation of business rules
✅ ViewModels = testable presentation logic
✅ Token Refresh Coordinator = robust auth UX
✅ Result Pattern = honest error handling
✅ Design System = consistent UI, easy theming

NEXT STEPS:
□ Add E2E tests (Maestro)
□ Add Sentry/Error tracking
□ Implement Push Notifications (expo-notifications)
□ Add Biometric Auth (expo-local-authentication)
□ CI/CD: EAS Build + Store Deployment
```

---

## SLIDE 17: Q&A
```
Thank you!

Questions?

Deep-dive topics available:
├── Token Refresh Coordinator internals
├── Testing Use Cases with tsyringe mocks
├── Migrating from Context to Zustand
├── Design System extensibility
├── Expo 54 migration notes
└── Offline-first architecture preview

Repository: [GitHub URL]
Documentation: ARCHITECTURE_DIAGRAM.md
```

---

## SPEAKER NOTES (Key Talking Points)

### Slide 5 (Folder Structure):
- "Notice domain/ has ZERO imports from React, Expo, or presentation"
- "Infrastructure implements domain interfaces - swap without touching business logic"
- "Presentation only knows about ViewModels, never UseCases or Repositories directly"

### Slide 9 (Live Trace):
- "This is the MOST IMPORTANT slide - trace it live in VS Code"
- "Each layer has ONE job: Screen→Form→ViewModel→UseCase→Repo→API"
- "Result pattern means every step handles success/failure explicitly"

### Slide 10 (Token Refresh):
- "Separate axios instance for refresh prevents infinite interceptor loops"
- "Coordinator queues requests during refresh - no race conditions"
- "Refresh token expiry = forced logout (security)"

### Slide 12 (New Feature):
- "This is why Clean Architecture pays off - 5 files, 5 minutes, zero regression risk"
- "Compare to 'add endpoint in controller, add function in service, update component...'"

### Slide 14 (Scalability):
- "We've structured this so a 5-person team can work in parallel without merge conflicts"
- "Domain layer is the contract - teams negotiate interfaces, not implementations"

---

## DEMO CHECKLIST (Before Presentation)
- [ ] `npm start` works, app loads on simulator/device
- [ ] Login flow works end-to-end
- [ ] Token refresh triggers (expire access token manually in devtools)
- [ ] Logout clears secure store, returns to Login
- [ ] VS Code open at key files: App.tsx, container.ts, LoginViewModel.ts, LoginUseCase.ts, AuthRepositoryImpl.ts, AuthApi.ts
- [ ] ARCHITECTURE_DIAGRAM.md open for reference