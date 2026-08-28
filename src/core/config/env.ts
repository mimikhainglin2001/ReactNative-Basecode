const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (typeof apiUrl !== "string" || apiUrl.trim().length === 0) {
  throw new Error("Missing required environment variable: EXPO_PUBLIC_API_URL");
}

export const ENV = {
  API_URL: apiUrl,
  APP_NAME: "EnterpriseRN",
} as const;
