
import { useEffect, useState } from 'react';
import {
  authenticateTelegram,
  getMyProfile,
} from '../services/auth.service';
import { setAccessToken } from '../services/api-client';

interface AuthUser {
  id: string;
  telegramId: string;
  firstName: string;
  lastName?: string | null;
  username?: string | null;
}

export function useTelegramAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function authenticate() {
      try {
        setLoading(true);
        setError(null);

        const webApp = window.Telegram?.WebApp;

        webApp?.ready();
        webApp?.expand();

        const initData = webApp?.initData;

        if (!initData) {
          throw new Error(
            'Open this application inside Telegram to authenticate.',
          );
        }

        const result = await authenticateTelegram(initData);

        if (!result.accessToken) {
          throw new Error('Authentication token is missing.');
        }

        setAccessToken(result.accessToken);

        const profile = await getMyProfile(result.accessToken);

        if (!cancelled) {
          setUser(profile.user);
        }
      } catch (err) {
        setAccessToken(null);

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Authentication failed.',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void authenticate();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    user,
    loading,
    error,
    authenticated: Boolean(user),
  };
}
