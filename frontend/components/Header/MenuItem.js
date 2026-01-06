"use client"; // این کامپوننت از هوک استفاده می‌کند، پس باید کلاینت کامپوننت باشد

import Link from "next/link";
import { usePathname } from "next/navigation"; // هوک برای خواندن URL فعلی

export default function MenuItem({ href, title  , isHeaderSticky }) {
  // آدرس URL فعلی را می‌خوانیم (مثال: '/profile')
  const pathname = usePathname();

  // اگر آدرس لینک با آدرس فعلی صفحه یکی باشد، این لینک 'فعال' است
  const isActive = pathname === href;

  return (
    <li className="mx-1">
      <Link
        href={href}
        className={`
    relative px-3 py-2 rounded-md font-medium transition-all duration-300 ease-in-out focus:outline-none group
    
    
    ${
      isHeaderSticky
        ? "text-black-200 dark:text-gray-300" // وقتی اسکرول شده، از رنگ‌های تم استفاده کن
        : "text-white" // وقتی بالای صفحه است، همیشه سفید بماند
    }

    /* شرط دوم: مربوط به فعال بودن لینک (صفحه‌ای که کاربر در آن است) */
    ${
      isActive
        ? "!text-primary-accent" // علامت تعجب برای اولویت بالاتر است
        : "opacity-80 hover:opacity-100 hover:text-primary-accent"
    }
  `}
      >
        {title}

        {/* 
          خط زیرین:
          - اگر لینک 'فعال' باشد، عرض آن کامل است.
          - اگر 'فعال' نباشد، عرض آن صفر است ولی در حالت هاور کامل می‌شود.
        */}
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
