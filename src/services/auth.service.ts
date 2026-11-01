const API_URL = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");

export interface TelegramAuthResponse {
  authenticated: boolean;
  tokenType: "Bearer";
  accessToken: string;
  expiresIn: number;
  user: {
    id: number;
    firstName: string;
    lastName?: string;
    username?: string;
  };
}

export async function authenticateTelegram(
  initData: string,
): Promise<TelegramAuthResponse> {
  if (!API_URL) {
    throw new Error(
      "API URL is missing. Configure VITE_API_BASE_URL and rebuild the app.",
    );
  }

  const response = await fetch(`${API_URL}/auth/telegram`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ initData }),
  }).catch(() => {
    throw new Error(
      "Cannot reach the authentication server. Please try again later.",
    );
  });

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const message =
      body && typeof body === "object" && "message" in body
        ? body.message
        : undefined;
    const detail =
      typeof message === "string"
        ? message
        : Array.isArray(message) &&
            message.every((item) => typeof item === "string")
          ? message.join("; ")
          : "Please try again later.";
    throw new Error(`Authentication failed (${response.status}): ${detail}`);
  }

  return response.json();
}

export async function getMyProfile(accessToken: string) {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch(() => {
    throw new Error(
      "Cannot reach the authentication server. Please try again later.",
    );
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile.");
  }

  return response.json();
}
