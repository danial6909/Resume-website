"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuItem({ href, title, isSticky }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isActive = pathname === href;

  // منطق هوشمند رنگ متن:
  // فقط وقتی سفید بماند که "صفحه اصلی" باشیم و "هنوز استیکی نشده باشیم" (روی اسلایدر)
  // در غیر این صورت (چه استیکی شده باشیم، چه در صفحات دیگه باشیم) از رنگ تم استفاده کن
  const isTransparentMode = isHomePage && !isSticky;

  return (
    <li className="mx-1">
      <Link
        href={href}
        className={`
          relative px-3 py-2 rounded-md font-medium transition-all duration-300 ease-in-out focus:outline-none group
          
          ${
            isTransparentMode
              ? "text-white" // فقط روی اسلایدر صفحه اصلی سفید ثابت
              : "text-foreground dark:text-gray-300" // در بقیه حالات (صفحات داخلی یا بعد اسکرول) تابع تم
          }

          ${
            isActive
              ? "!text-primary-accent" 
              : "opacity-80 hover:opacity-100 hover:text-primary-accent"
          }
        `}
      >
        {title}

        {/* خط زیرین متحرک */}
        <span
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5
            bg-gradient-to-r from-primary-accent to-secondary-accent 
            transition-all duration-500 ease-out rounded-full
            ${isActive ? "w-3/4" : "w-0 group-hover:w-3/4"}
          `}
        />
      </Link>
    </li>
  );
}
