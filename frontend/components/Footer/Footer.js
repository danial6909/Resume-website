"use client";
import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronLeft,
  Clock,
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";
import NebulaInput from "../NebulaInput";

const Footer = () => {
  return (
    <footer
      className="w-full bg-background border-t border-border pt-12 px-5 font-['VazirMatn',_vazir,_sans-serif]"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {/* ستون اول: درباره کوتاه و سوشال */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary-accent rounded-lg text-white">
              <Code2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              دانیال توسعه‌دهنده
            </h2>
          </div>
          <p className="text-muted-foreground text-xs leading-6 text-justify">
            دانشجوی ۲۱ ساله و مشتاق یادگیری MERN Stack. تمرکز من روی خلق
            رابط‌های کاربری جذاب با React و پیاده‌سازی بک‌اندهای بهینه است.
          </p>

          <div className="card-socials flex gap-2 flex-wrap">
            <SocialIcon
              href="#"
              type="one"
              d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
            />
            <SocialIcon
              href="#"
              type="two"
              d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
            />
            <SocialIcon
              href="#"
              type="five"
              viewBox="0 0 16 16"
              d="M15.668 2.626L13.43 13.21c-.17.77-.62 1.15-1.27.78l-3.41-2.51-1.65 1.59c-.18.18-.34.34-.69.34l.24-3.44 6.27-5.67c.27-.24-.06-.37-.42-.13L5.2 9.42l-3.34-1.04c-.73-.23-.74-.73.15-1.08L15.1 1.93c.6-.23 1.12.13.57.7z"
            />
          </div>
        </motion.div>

        {/* ستون دوم: لینک‌های سریع */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:pr-8 space-y-4"
        >
          <h3 className="text-lg font-bold text-foreground">دسترسی سریع</h3>
          <ul className="space-y-3">
            {["صفحه اصلی", "پروژه‌ها", "مهارت‌ها", "درباره ما"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary-accent transition-all duration-300 text-sm flex items-center group"
                >
                  {/* فلش ثابت */}
                  <ChevronLeft size={14} className="shrink-0" />

                  {/* متنی که به سمت چپ حرکت می‌کند */}
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-[-8px] pr-1">
                    {item}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ستون سوم: تماس */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-lg font-bold text-foreground">ارتباط</h3>
          <div className="space-y-4">
            <ContactInfo icon={<MapPin size={16} />} detail="تهران، ایران" />
            <ContactInfo icon={<Phone size={16} />} detail="۰۹۱۲-۰۰۰۰۰۰۰" />
            <ContactInfo
              icon={<Mail size={16} />}
              detail="danial@example.com"
            />
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 bg-green-500/5 px-2 py-1 rounded-md w-fit border border-green-500/20">
              <Clock size={12} />
              <span>در دسترس برای پروژه</span>
            </div>
          </div>
        </motion.div>

        {/* ستون چهارم: فرم تماس جمع‌وجور */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">ارسال پیام</h3>
          <div className="space-y-3">
            {/* ردیف اول: نام و ایمیل در یک خط */}
            <div className="grid grid-cols-2 gap-2">
              <NebulaInput label="نام" id="fname" name="firstname" />
              <NebulaInput label="ایمیل" id="email" name="email" type="email" />
            </div>

            <NebulaInput
              label="پیام..."
              id="message"
              name="message"
              type="textarea"
              rows="2"
              className="resize-none"
            />

            <button className="flex items-center gap-2 bg-primary-accent text-white w-full py-2.5 rounded-lg hover:opacity-90 transition-all font-bold group cursor-pointer justify-center text-sm shadow-lg shadow-primary-accent/20">
              ارسال پیام
              <Send
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
            </button>
          </div>
        </motion.div>
      </div>

      {/* کپی رایت نهایی */}
         <div className="mt-12 mb-6 pt-6 border-t border-border text-center text-muted-foreground text-xs">

        <p>© {new Date().getFullYear()} طراحی و توسعه با ❤️ توسط دانیال | تمامی حقوق محفوظ است</p>

      </div>

      <style jsx>{`
        :global(.socialContainer) {
          width: 40px;
          height: 40px;
          background-color: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: 0.3s;
          border-radius: 10px;
        }
        :global(.socialContainer:hover) {
          transform: translateY(-3px);
        }
        :global(.container-one:hover) {
          background-color: #d62976;
        }
        :global(.container-two:hover) {
          background-color: #00acee;
        }
        :global(.container-five:hover) {
          background-color: #0088cc;
        }

        :global(.socialSvg) {
          width: 16px;
          fill: white;
        }
        :global(.socialContainer:hover .socialSvg) {
          animation: slide-in-top 0.3s both;
        }
        @keyframes slide-in-top {
          0% {
            transform: translateY(-35px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </footer>
  );
};

const ContactInfo = ({ icon, detail }) => (
  <div className="flex items-center gap-2 hover:text-primary-accent transition-colors cursor-default">
    <div className="text-primary-accent/80">{icon}</div>
    <span className="text-muted-foreground text-[13px]">{detail}</span>
  </div>
);

const SocialIcon = ({ href, type, d, viewBox = "0 0 16 16" }) => (
  <a href={href} className={`socialContainer container-${type}`}>
    <svg className="socialSvg" viewBox={viewBox}>
      <path d={d} />
    </svg>
  </a>
);

export default Footer;
