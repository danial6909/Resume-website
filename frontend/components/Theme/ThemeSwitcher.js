"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunMedium, Moon } from "lucide-react";

export default function ThemeSwitcher({ isHeaderSticky }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 w-10 h-10"></div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
      className={`p-2 rounded-full transition-all duration-500 ease-out cursor-pointer hover:rotate-[360deg] hover:scale-110
        ${
          isHeaderSticky
            ? // حالت Sticky: تابع تم (رنگ متغیر)
              "text-black-200  dark:text-primary-accent hover:bg-gray-200 dark:hover:bg-border"
            : // حالت عادی (بالای صفحه): رنگ ثابت (مثلاً طلایی یا سفید که روی زمینه تیره قشنگ باشد)
              "text-primary-accent hover:bg-white/10"
        }
      `}
    >
      {theme === "dark" ? <SunMedium size={20} /> : <Moon size={20} />}
    </button>
  );
}