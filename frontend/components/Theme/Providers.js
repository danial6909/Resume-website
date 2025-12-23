"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    // attribute="class" باعث میشه کلاس dark به تگ html اضافه بشه
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}