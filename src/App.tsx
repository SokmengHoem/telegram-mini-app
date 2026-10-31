import { useEffect, useState } from "react";
import "./App.css";
import {
  authenticateTelegram,
  type TelegramAuthResponse,
} from "./services/auth.service";

function App() {
  const [user, setUser] = useState<TelegramAuthResponse["user"] | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [status, setStatus] = useState("Checking Telegram...");

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;

    if (!webApp) {
      setStatus("Browser preview mode");
      return;
    }

    webApp.ready();
    webApp.expand();
    setIsTelegram(true);

    if (!webApp.initData) {
      setStatus("Telegram authentication data is missing.");
      return;
    }

    authenticateTelegram(webApp.initData)
      .then((result) => {
        setUser(result.user);
        setStatus("Authenticated successfully");
      })
      .catch(() => {
        setStatus("Authentication failed. Please reopen the Mini App.");
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight">Task Manager</h1>

        <p className="mt-3 text-sm text-gray-600">{status}</p>

        {isTelegram && user && (
          <section className="mt-6 rounded-xl border bg-white p-5">
            <h2 className="text-lg font-semibold">
              Welcome, {user.firstName}!
            </h2>
            <p className="mt-2 text-sm text-gray-600">Telegram ID: {user.id}</p>
            {user.username && (
              <p className="text-sm text-gray-600">
                Username: @{user.username}
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
