import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isTelegram, setIsTelegram] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;

    if (!webApp) return;

    webApp.ready();
    webApp.expand();

    setIsTelegram(true);
    setFirstName(webApp.initDataUnsafe.user?.first_name ?? "");
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Task Manager</h1>

          {isTelegram ? (
            <p className="mt-2 text-sm text-gray-600">
              Welcome{firstName ? `, ${firstName}` : ""}!
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Running in browser preview mode.
            </p>
          )}
        </header>

        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Tasks</h2>

            <button
              type="button"
              className=" rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              + Add Task
            </button>
          </div>

          <div className="mt-6 rounded-lg border border-dashed border-gray-300 px-4 py-10 text-center">
            <p className="text-sm text-gray-500">
              Your tasks interface will be built here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
