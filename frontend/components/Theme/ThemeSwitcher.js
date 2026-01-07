// "use client";

// import { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import { SunMedium, Moon } from "lucide-react";

// export default function ThemeSwitcher() {
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   // برای جلوگیری از مشکل Hydration، باید صبر کنیم تا کامپوننت در کلاینت Mount شود
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return <div className="p-2 w-10 h-10"></div>;
//   }

//   return (
//     <button
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       aria-label="Toggle Dark Mode"
//      className="p-2 rounded-full transition duration-800 hover:rotate-360
//                  text-gray-600 hover:bg-gray-200
//                  dark:text-primary-accent dark:hover:bg-border cursor-pointer ease-out hover:scale-105"
//     >
//       {theme === "dark" ? <SunMedium size={20} /> : <Moon size={20} />}
//     </button>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunMedium, Moon } from "lucide-react";
import { usePathname } from "next/navigation"; // اضافه کردن این برای تشخیص صفحه

export default function ThemeSwitcher({ isSticky }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 w-10 h-10"></div>;
  }

  // منطق مشابه MenuItem: 
  // فقط در صفحه اصلی و قبل از اسکرول حالت شفاف (رنگ ثابت) داریم
  const isTransparentMode = isHomePage && !isSticky;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
      className={`p-2 rounded-full transition-all duration-500 ease-out cursor-pointer hover:rotate-[360deg] hover:scale-110
        ${
          isTransparentMode
            ? // حالت بالای صفحه اصلی: رنگ ثابت (طلایی/سفید) برای دیده شدن روی اسلایدر
              "text-primary-accent hover:bg-white/10"
            : // حالت استیکی یا صفحات داخلی: رنگ‌های متغیر بر اساس تم (Light/Dark)
              "text-foreground dark:text-primary-accent hover:bg-gray-200 dark:hover:bg-gray-800"
        }
      `}
    >
      {theme === "dark" ? <SunMedium size={20} /> : <Moon size={20} />}
    </button>
  );
}