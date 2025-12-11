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

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm border-b border-border h-16 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        
        {/* لوگو */}
        <div>
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-wide bg-gradient-to-r from-primary-accent to-third-accent bg-clip-text text-transparent"
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
          <LoginBtn />
        </div>
      </div>
    </header>
  );
}