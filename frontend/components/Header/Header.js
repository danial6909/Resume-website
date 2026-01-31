"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import MenuItem from "./MenuItem";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import LoginBtn from "./LoginBtn";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // وارد کردن آیکون همبرگری و بستن

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // وضعیت باز یا بسته بودن منوی موبایل
  const { user } = useAuth();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const menuItems = [
    { title: "خانه", link: "/" },
    { title: "رزومه", link: "/resume" },
    { title: "نمونه کارها", link: "/portfolio" },
    { title: "خدمات ما", link: "/services" },
    { title: "تماس با ما", link: "/contact" },
  ];

  // بستن منو وقتی آدرس صفحه عوض می‌شود
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 200;
      setIsSticky(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMenuOpen]);

  const getHeaderStyles = () => {
    if (isSticky) {
      return "fixed top-0 bg-background/80 backdrop-blur-lg shadow-md border-border animate-slide-down";
    }
    if (isHomePage) {
      return "absolute top-0 bg-transparent border-transparent";
    }
    return "absolute top-0 bg-background border-border";
  };

  // رنگ متن/آیکون‌ها بر اساس شفافیت هدر
  const isTransparent = isHomePage && !isSticky;

  return (
    <>
      <header
        className={`w-full h-16 z-50 transition-all duration-300 ease-in-out border-b ${getHeaderStyles()}`}
      >
        <div className="container mx-auto px-4 h-full flex justify-between items-center">
          
          {/* بخش سمت راست: لوگو و دکمه موبایل */}
          <div className="flex items-center gap-4">
            {/* دکمه همبرگری فقط در موبایل (md:hidden) */}
            <button
              className="md:hidden group flex flex-col items-center justify-center gap-1.5 z-[70] cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* خط اول */}
              <div
                className={`h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "w-8 rotate-45 translate-y-2 bg-white" : "w-6"
                } ${
                  isTransparent && !isMenuOpen ? "bg-white" : "bg-foreground"
                }`}
              />

              {/* خط دوم */}
              <div
                className={`h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "w-8"
                } ${
                  isTransparent && !isMenuOpen ? "bg-white" : "bg-foreground"
                }`}
              />

              {/* خط سوم */}
              <div
                className={`h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen
                    ? "w-8 -rotate-45 -translate-y-2 bg-white"
                    : "w-4 self-end"
                } ${
                  isTransparent && !isMenuOpen ? "bg-white" : "bg-foreground"
                }`}
              />
            </button>

            {/* لوگو */}
            <Logo />

          </div>

          {/* منوی دسکتاپ (در موبایل مخفی: hidden md:block) */}
          <nav className="hidden md:block">
            <ul className="flex space-x-5 space-x-reverse">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.title}
                  title={item.title}
                  href={item.link}
                  isSticky={isSticky}
                />
              ))}
            </ul>
          </nav>

          {/* دکمه‌ها و پروفایل */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <ThemeSwitcher isSticky={isSticky} />

            {user ? (
              <Link
                href="/profile"
                className={`relative flex items-center justify-center w-13 h-13 rounded-full border-2 mr-2.5 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm overflow-hidden ${
                  isTransparent
                    ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                    : "border-primary-accent/20 bg-primary-accent/10 text-primary-accent hover:bg-primary-accent/20"
                }`}
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.username}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold uppercase tracking-tighter">
                    {user.username?.charAt(0) || "U"}
                  </span>
                )}

                {/* یک نقطه سبز کوچک برای نشان دادن وضعیت آنلاین بودن (اختیاری) */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full"></span>
              </Link>
            ) : (
              <div className={isTransparent ? "dark" : ""}>
                <LoginBtn />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- منوی موبایل Full-Screen با پالت رنگی اختصاصی --- */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-700 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* پس‌زمینه با استفاده از رنگ Surface و Background تو */}
        <div
          className={`absolute top-5 right-5 w-10 h-10 bg-[var(--surface)] rounded-full transition-transform duration-[1000ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isMenuOpen ? "scale-[150]" : "scale-0"
          }`}
        />

        {/* محتوای منو */}
        <nav
          className={`relative z-10 h-full w-full flex flex-col justify-between p-10 sm:p-20 transition-all duration-500 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* هدر منو: لوگو و دکمه بستن مدرن */}
          <div className="flex justify-between items-center w-full">
            <div
              className={`transition-all duration-700 delay-300 ${
                isMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              
            <Logo/>

            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className={`relative group p-4 rounded-full transition-all duration-500 overflow-hidden ${
                isMenuOpen
                  ? "scale-100 opacity-100 rotate-0"
                  : "scale-0 opacity-0 -rotate-90"
              }`}
              style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
            >
              {/* لایه پشت دکمه که موقع هوور پر می‌شود */}
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-300" />

              {/* آیکون اصلی */}
              <X
                size={24}
                strokeWidth={1.2}
                className="relative z-10 text-foreground transition-transform duration-500 group-hover:rotate-90 cursor-pointer"
              />
            </button>
          </div>

          <ul className="flex flex-col space-y-3 text-right w-full max-w-md mr-auto">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.link;
              return (
                <li key={item.title} className="relative group">
                  <Link
                    href={item.link}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      transitionDelay: isMenuOpen
                        ? `${index * 70 + 300}ms`
                        : "0ms",
                    }}
                    className={`relative flex items-center justify-between p-4 rounded-2xl transition-all duration-500 overflow-hidden ${
                      isMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-10 opacity-0"
                    }`}
                  >
                    {/* افکت پشت متن که موقع هوور ظاهر می‌شود */}
                    <div className="absolute inset-0 bg-gradient-to-l from-[var(--primary-accent)]/10 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                    {/* نشانگر سمت راست (یک خط عمودی ظریف) */}
                    <div
                      className={`absolute right-0 w-1 h-0 bg-[var(--primary-accent)] transition-all duration-300 ${
                        isActive ? "h-2/3" : "group-hover:h-1/2"
                      }`}
                    />

                    <div className="relative z-10 flex items-center gap-4">
                      {/* شماره آیتم */}
                      <span
                        className={`text-[10px] font-mono transition-colors ${
                          isActive
                            ? "text-[var(--primary-accent)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        0{index + 1}.
                      </span>

                      {/* متن اصلی با سایز مناسب */}
                      <span
                        className={`text-2xl font-semibold tracking-tight transition-all duration-300 ${
                          isActive
                            ? "text-[var(--primary-accent)]"
                            : "text-[var(--text-main)] group-hover:text-[var(--secondary-accent)]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* آیکون یا فلش کوچک در سمت چپ */}
                    <div
                      className={`relative z-10 transition-all duration-300 transform ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--secondary-accent)]"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* فوتر منو با استایل Faded و Muted */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-[var(--border)] pt-10 transition-all duration-1000 delay-[700ms] ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col gap-2">
              <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest">
                ارتباط مستقیم
              </span>
              <a
                href="mailto:info@danial.com"
                className="text-[var(--text-faded)] hover:text-[var(--primary-accent)] transition-colors"
              >
                info@danial.com
              </a>
            </div>

            <div className="flex gap-6 sm:justify-end items-center">
              {["Instagram", "LinkedIn", "Github"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[var(--text-muted)] hover:text-[var(--secondary-accent)] text-xs transition-all duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
