// "use client"
// import { useState, useEffect } from "react"; // اضافه شد
// import Link from "next/link";
// import MenuItem from "./MenuItem";
// import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
// import LoginBtn from "./LoginBtn";
// import Image from "next/image";
// import logo from "@/public/logo/logo.jpg"
// import { useAuthLogic } from "@/hooks/useAuthLogic";

// export default function Header() {
//   const { user } = useAuthLogic();
//   const [mounted, setMounted] = useState(false);

//   // این useEffect تضمین می‌کند که کدهای مربوط به کلاینت (مثل وضعیت کاربر)
//   // فقط بعد از لود شدن کامل در مرورگر نمایش داده شوند
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const menuItems = [
//     { title: 'خانه', link: '/' },
//     { title: 'نمونه کارها', link: '/portfolio' },
//     { title: 'خدمات ما', link: '/services' },
//     { title: 'درباره ما', link: '/about' },
//     { title: 'تماس با ما', link: '/contact' },
//   ];

//   return (
//     <header className="sticky top-0 bg-background shadow-sm border-b border-border h-16 z-10">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">

//         {/* لوگو */}
//         <div>
//           <Link href="/" className="block">
//             <Image
//               quality={100}
//               src={logo}
//               alt="Logo"
//               className="w-20 h-10 object-contain rounded"
//             />
//           </Link>
//         </div>

//         {/* منوی اصلی */}
//         <nav className="hidden md:block">
//           <ul className="flex space-x-5 space-x-reverse">
//             {menuItems.map((item) => (
//               <MenuItem key={item.title} title={item.title} href={item.link} />
//             ))}
//           </ul>
//         </nav>

//         {/* دکمه‌های کاربری */}
//         <div className="flex items-center space-x-3 space-x-reverse">
//           <ThemeSwitcher />

//           {/* فقط اگر کامپوننت مونت شده بود، دکمه ورود یا پروفایل را نشان بده */}
//           {mounted && (
//             user ? <UserProfileBtn /> : <LoginBtn />
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// function UserProfileBtn() {
//   return (
//     <Link
//       href="/dashboard/profile"
//       className="px-4 py-2 bg-third-accent text-white rounded-lg hover:bg-opacity-90 transition-all text-sm"
//     >
//       پروفایل کاربری
//     </Link>
//   );
// }

// src/components/Header.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react"; // <-- وارد کردن هوک‌ها
import { useAuth } from "@/context/AuthContext";
import MenuItem from "./MenuItem";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import LoginBtn from "./LoginBtn";
import logo from "@/public/logo/logo.jpg";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      // هدر بعد از 300 پیکسل اسکرول، sticky می‌شود
      const threshold = 200;
      if (window.scrollY > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // پاک کردن event listener برای جلوگیری از نشت حافظه
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // [] باعث می‌شود این افکت فقط یک بار اجرا شود

  const menuItems = [
    { title: "خانه", link: "/" },
    { title: "رزومه", link: "/resume" },
    { title: "نمونه کارها", link: "/portfolio" },
    { title: "خدمات ما", link: "/services" },
    { title: "تماس با ما", link: "/contact" },
  ];

  return (
    <>
      {/* 
        یک placeholder نامرئی که فقط زمانی که هدر sticky است،
        فضا اشغال می‌کند تا از پرش محتوا به بالا جلوگیری شود.
      */}
      {/* {isSticky && <div className="h-16 w-full" />} */}

      <header
        className={`top-0 bg-background shadow-sm border-b border-border   w-full h-16 z-30 transition-all duration-300 ease-in-out 
          ${
            isSticky
              ? "fixed top-0 animate-slide-down bg-background/80 backdrop-blur-lg shadow-md border-b border-border"
              : "absolute top-0 bg-transparent" // در حالت عادی، بالای صفحه قرار دارد
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div>
            <Link href="/">
              <div>
                <Image
                  quality={100}
                  src={logo}
                  alt="Logo"
                  className="w-20 h-10"
                />
              </div>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-5 space-x-reverse">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.title}
                  title={item.title}
                  href={item.link}
                />
              ))}
            </ul>
          </nav>
          {/* Action Buttons */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <ThemeSwitcher />

            {user ? (
              <div className="flex items-center gap-3">
                {/* نمایش نام کاربری */}
                <span className="hidden sm:inline text-sm font-medium">
                  {user.username}
                </span>

                {/* لینک به صفحه پروفایل */}
                <Link
                  href="/profile"
                  className="transition-transform hover:scale-105 active:scale-95"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-secondary shadow-sm">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.username}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-primary font-bold uppercase text-lg">
                        {user.username?.charAt(0)}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <LoginBtn />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
