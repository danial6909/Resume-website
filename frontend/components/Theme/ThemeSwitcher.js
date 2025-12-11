// src/components/ThemeSwitcher.js
"use client";

import { useTheme } from "@/context/ThemeContext"; // Import جدید
import { SunMedium } from "lucide-react";
import { Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, toggleTheme, mounted } = useTheme();

  // تا زمانی که Context در کلاینت mount نشده، دکمه را نمایش نده
  //   if (!mounted) {
  //     return null;
  //   }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded-full transition duration-800 hover:rotate-360
                 text-gray-600 hover:bg-gray-200
                 dark:text-secondary-accent dark:hover:bg-border cursor-pointer ease-out hover:scale-105"
    >
      {theme === "dark" ? <SunMedium /> : <Moon />}
    </button>
  );
}
