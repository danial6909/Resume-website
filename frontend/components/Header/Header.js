// // src/components/Header.js
// import Link from "next/link";
// import MenuItem from "./MenuItem";
// import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
// import LoginBtn from "./LoginBtn";
// import Image from "next/image";
// import logo from "@/public/logo/logo.jpg"

// export default function Header() {
//   const menuItems = [
//     { title: 'خانه', link: '/' },
//     { title: 'نمونه کارها', link: '/portfolio' },
//     { title: 'خدمات ما', link: '/services' },
//     { title: 'درباره ما', link: '/about' },
//     { title: 'تماس با ما', link: '/contact' },
//   ];
  
// //bg-slate-950
// // bg-slate-900/50
//   return (
//     <header className="sticky top-0  bg-background shadow-sm border-b border-border h-16 z-10">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        
//         {/* لوگو */}
//         <div>
//           <Link 
//             href="/" 
//             className="text-2xl font-bold tracking-wide bg-gradient-to-r from-third-accent to-third-accent bg-clip-text text-transparent"
//           >
//          <div>
//             <Image  quality={100} src={logo}  alt="Logo" className="w-20 h-10 "   />

//          </div>

        
//           </Link>
//         </div>

//         {/* منوی اصلی (در دسکتاپ) */}
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
//           {/* {user ? <UserProfileBtn /> : <LoginBtn />} */}
//         <LoginBtn/>
//         </div>
//       </div>
//     </header>
//   );
// }

// function UserProfileBtn() {
//   return (
//     <Link 
//       href="/dashboard/profile" // یا هر آدرس دیگری برای پروفایل
//       className="px-4 py-2 bg-third-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
//     >
//       پروفایل کاربری
//     </Link>
//   );
// }


// src/components/Header.js
"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react"; // <-- وارد کردن هوک‌ها

import MenuItem from "./MenuItem";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import LoginBtn from "./LoginBtn";
import logo from "@/public/logo/logo.jpg";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // هدر بعد از 300 پیکسل اسکرول، sticky می‌شود
      const threshold = 300; 
      if (window.scrollY > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // پاک کردن event listener برای جلوگیری از نشت حافظه
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // [] باعث می‌شود این افکت فقط یک بار اجرا شود

  const menuItems = [
    { title: 'خانه', link: '/' },
    { title: 'نمونه کارها', link: '/portfolio' },
    { title: 'خدمات ما', link: '/services' },
    { title: 'درباره ما', link: '/about' },
    { title: 'تماس با ما', link: '/contact' },
  ];

  return (
    <>
      {/* 
        یک placeholder نامرئی که فقط زمانی که هدر sticky است،
        فضا اشغال می‌کند تا از پرش محتوا به بالا جلوگیری شود.
      */}
      {isSticky && <div className="h-16 w-full" />}

      <header 
        className={`w-full h-16 z-30 transition-all duration-300 ease-in-out
          ${isSticky
            ? 'fixed top-0 animate-slideDown bg-background/80 backdrop-blur-lg shadow-md border-b border-border'
            : 'absolute top-0 bg-transparent' // در حالت عادی، بالای صفحه قرار دارد
          }`
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          
          <div>
            <Link href="/">
              <div>
                <Image quality={100} src={logo} alt="Logo" className="w-20 h-10" />
              </div>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-5 space-x-reverse">
              {menuItems.map((item) => (
                <MenuItem key={item.title} title={item.title} href={item.link} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center space-x-3 space-x-reverse">
            <ThemeSwitcher />
            <LoginBtn />
          </div>
        </div>
      </header>
    </>
  );
}

