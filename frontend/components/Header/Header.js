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
  className={`fixed top-0 w-full h-16 z-30 transition-all duration-300 ease-in-out border-b
    ${
      isSticky
        ? "animate-slide-down bg-background/80 backdrop-blur-lg shadow-md border-border"
        : "bg-transparent border-transparent"
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
            isHeaderSticky={isSticky} // این پروپ جدید رو پاس میدیم
          />
        ))}
      </ul>
    </nav>
 {/* Action Buttons */}
<div className="flex items-center space-x-3 space-x-reverse">
  
  {/* دکمه تغییر تم - با استفاده از wrapper برای کنترل رنگ در حالت عادی */}
  
    <ThemeSwitcher isHeaderSticky={isSticky} />
  

  {user ? (
    <div className="flex items-center gap-3">
      {/* نام کاربری */}
      <span className={`hidden sm:inline text-sm font-medium transition-colors duration-300
        ${isSticky ? "text-foreground" : "text-white"}`}>
        {user.username}
      </span>

      {/* آواتار کاربر */}
      <Link
        href="/profile"
        className="transition-transform hover:scale-105 active:scale-95"
      >
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all duration-300
          ${isSticky 
            ? "border-primary bg-secondary shadow-sm" 
            : "border-white/50 bg-white/10"}`}>
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.username}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <span className={`font-bold uppercase text-lg ${isSticky ? "text-primary" : "text-white"}`}>
              {user.username?.charAt(0)}
            </span>
          )}
        </div>
      </Link>
    </div>
  ) : (
    /* دکمه لاگین */
    <div className={`transition-all duration-300 ${!isSticky ? "dark" : ""}`}>
      {/* نکته: با دادن کلاس "dark" به صورت دستی در حالت غیر استیکی، 
        اگر کامپوننت LoginBtn از متغیرهای Tailwind استفاده کرده باشه، 
        مجبور میشه استایل تیره (که روی پس‌زمینه ثابت ما قشنگ‌تره) رو بگیره.
      */}
      <LoginBtn />
    </div>
  )}
</div>
        </div>
      </header>
    </>
  );
}
