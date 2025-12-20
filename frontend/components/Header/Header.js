// src/components/Header.js
import Link from "next/link";
import MenuItem from "./MenuItem";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import LoginBtn from "./LoginBtn";
import Image from "next/image";
import logo from "@/public/logo/logo.jpg"

export default function Header() {
  const menuItems = [
    { title: 'خانه', link: '/' },
    { title: 'نمونه کارها', link: '/portfolio' },
    { title: 'خدمات ما', link: '/services' },
    { title: 'درباره ما', link: '/about' },
    { title: 'تماس با ما', link: '/contact' },
  ];
  
//bg-slate-950
// bg-slate-900/50
  return (
    <header className="sticky top-0  bg-background shadow-sm border-b border-border h-16 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        
        {/* لوگو */}
        <div>
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-wide bg-gradient-to-r from-third-accent to-third-accent bg-clip-text text-transparent"
          >
         <div>
            <Image  quality={100} src={logo}  alt="Logo" className="w-20 h-10 "   />

         </div>

        
          </Link>
        </div>

        {/* منوی اصلی (در دسکتاپ) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-5 space-x-reverse">
            {menuItems.map((item) => (
              <MenuItem key={item.title} title={item.title} href={item.link} />
            ))}
          </ul>
        </nav>

        {/* دکمه‌های کاربری */}
        <div className="flex items-center space-x-3 space-x-reverse">
          <ThemeSwitcher />
          {/* {user ? <UserProfileBtn /> : <LoginBtn />} */}
        <LoginBtn/>
        </div>
      </div>
    </header>
  );
}

function UserProfileBtn() {
  return (
    <Link 
      href="/dashboard/profile" // یا هر آدرس دیگری برای پروفایل
      className="px-4 py-2 bg-third-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
    >
      پروفایل کاربری
    </Link>
  );
}