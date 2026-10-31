const API_URL = import.meta.env.VITE_API_BASE_URL;

export interface TelegramAuthResponse {
  authenticated: boolean;
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
  const response = await fetch(`${API_URL}/auth/telegram`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ initData }),
  });

  if (!response.ok) {
    throw new Error("Telegram authentication failed");
  }

  return response.json();
}
