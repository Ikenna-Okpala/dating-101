"use client";

import { EmailPasswordProvider, UserProvider } from "../contexts/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmailPasswordProvider>
      <UserProvider>{children}</UserProvider>
    </EmailPasswordProvider>
  );
}
