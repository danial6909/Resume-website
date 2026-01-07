// "use client"; // این کامپوننت از هوک استفاده می‌کند، پس باید کلاینت کامپوننت باشد

// import Link from "next/link";
// import { usePathname } from 'next/navigation'; // هوک برای خواندن URL فعلی

// export default function MenuItem({ href, title }) {
//   // آدرس URL فعلی را می‌خوانیم (مثال: '/profile')
//   const pathname = usePathname();
  
//   // اگر آدرس لینک با آدرس فعلی صفحه یکی باشد، این لینک 'فعال' است
//   const isActive = pathname === href;

//   return (
//     <li className="mx-1">
//       <Link
//         href={href}
//         className={`
//           relative px-3 py-2 rounded-md font-medium transition-colors duration-300 ease-in-out
//           focus:outline-none group
//           ${isActive 
//             ? 'text-primary-accent' // رنگ متن در حالت فعال
//             : 'text-text-faded hover:text-primary-accent' // رنگ متن در حالت عادی و هاور
//           }
//         `}
//       >
//         {title}
        
//         {/* 
//           خط زیرین:
//           - اگر لینک 'فعال' باشد، عرض آن کامل است.
//           - اگر 'فعال' نباشد، عرض آن صفر است ولی در حالت هاور کامل می‌شود.
//         */}
//         <span 
//           className={`
//             absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5
//             bg-gradient-to-r from-primary-accent to-secondary-accent 
//             transition-all duration-500 ease-out rounded-full
//             ${isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'}
//           `} 
//         />
//       </Link>
//     </li>
//   );
// }












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
