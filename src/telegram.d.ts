export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            username?: string;
          };
        };
        colorScheme: "light" | "dark";
      };
    };
  }
}

// What to understand
// - ready() tells Telegram the Mini App has initialized.
// - expand() requests the expanded view.
// - initDataUnsafe.user is convenient for displaying a greeting, but must not be trusted for authentication.
// - initData is the raw data that your backend will validate in a later security lesson.
// - The Mini App generally needs an HTTPS URL when opened through Telegram. A localhost preview alone does not establish a working Telegram integration.
