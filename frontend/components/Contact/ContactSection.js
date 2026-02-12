"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import TitleHeaderPages from "../TitleHeaderPages";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <>
      <div
        className=" bg-background pt-10 px-6 mx-auto font-[vazir] max-w-7xl "
        dir="rtl"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 ">
          <TitleHeaderPages title1="Contact" title2="تماس با " />
        </div>
      </div>

      <section
        dir="rtl"
        className="min-h-screen bg-background text-main px-6 pb-20 font-[vazir]"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 bg-background border border-border rounded-2xl p-6 md:p-8 shadow-2xl"
        >
          {/* Info - سمت راست */}
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary-accent mb-3 ">
                ارتباط با ما
              </h3>
              <p className="text-faded text-sm leading-relaxed mb-8">
                دنبال ساختن ایده‌های خلاقانه و حل چالش‌های دنیای نرم‌افزار
                هستیم. اگر پروژه‌ای در ذهن دارید یا صرفاً می‌خواهید گپ فنی
                بزنیم، مشتاقانه منتظر پیام شما هستیم .{" "}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContactItem
                  icon={<Send size={18} />}
                  label="فرانت‌ اِند"
                  value="@dan6909"
                  link="https://t.me/dan6909"
                  color="text-primary-accent"
                />
                <ContactItem
                  icon={<Send size={18} />}
                  label="بک‌ اِند"
                  value="@kelidari2025"
                  link="https://t.me/kelidari2025"
                  color="text-primary-accent"
                />
                <ContactItem
                  icon={<span className="font-bold text-[12px]">in</span>}
                  label="لینکدین"
                  value="Danial Dev"
                  link="https://linkedin.com/in/yourprofile"
                  color="text-primary-accent"
                />
                <ContactItem
                  icon={<Mail size={18} />}
                  label="ایمیل"
                  value="dan@mail.com"
                  color="text-primary-accent"
                />
                <ContactItem
                  icon={<Phone size={18} />}
                  label="تلفن"
                  value="۰۹۱۲۰۰۰۰۰۰۰"
                  color="text-primary-accent"
                />
                <ContactItem
                  icon={<MapPin size={18} />}
                  label="موقعیت"
                  value="مشهد، ایران"
                  color="text-primary-accent"
                />
              </div>
            </div>

            {/* بخش آمار - طراحی نئونی و زیباتر */}
            <div className="flex gap-4 pt-6 border-t border-border/30">
              <StatCard label="پاسخگویی" value="24h" />
              <StatCard label="رضایت مشتری" value="100%" />
            </div>
          </div>

          {/* Form - سمت چپ */}
          <div className="bg-surface/5 p-4 rounded-xl border border-border/20 shadow-inner">
            <ContactForm padding={4} width="min-w-full" row={7} />
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="max-w-6xl mx-auto mt-20">
          <h3 className="text-3xl font-bold mb-8 text-center">سوالات متداول</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                className="bg-surface border border-border rounded-xl p-6 hover:border-primary-accent/40 transition-colors"
              >
                <h4 className="font-semibold mb-2">{f.q}</h4>
                <p className="text-faded text-sm leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// کامپوننت داخلی برای کارت‌های آمار
const StatCard = ({ label, value }) => (
  <div className="flex-1 relative group overflow-hidden bg-surface/10 border border-border/40 rounded-2xl p-4 transition-all duration-500 hover:border-primary-accent/50">
    <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary-accent/5 blur-3xl rounded-full group-hover:bg-primary-accent/15 transition-all"></div>
    <div className="relative z-10 flex flex-col items-center">
      <span className="text-primary-accent font-black text-2xl tracking-tighter">
        {value}
      </span>
      <span className="text-muted text-[11px] font-bold uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  </div>
);

const ContactItem = ({ icon, label, value, link, color }) => {
  const CardContent = (
    <motion.div
      whileHover={
        link ? { x: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" } : {}
      }
      className={`flex items-center gap-4 p-4 rounded-xl bg-surface/5 border border-transparent 
        ${link ? "hover:border-border/50 cursor-pointer" : "cursor-default"} 
        transition-all duration-300 group h-full`}
    >
      <div
        className={`p-3 rounded-lg bg-background border border-border ${link ? "group-hover:border-primary-accent group-hover:shadow-[0_0_15px_rgba(0,188,145,0.2)]" : ""} ${color} transition-all duration-300 shadow-lg shadow-black/20`}
      >
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[12px] text-muted uppercase tracking-widest font-bold opacity-70 mb-0.5">
          {label}
        </span>
        <span
          className={`text-base font-bold text-text-main truncate ${link ? "group-hover:text-primary-accent" : ""} transition-colors`}
        >
          {value}
        </span>
      </div>
    </motion.div>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {CardContent}
    </a>
  ) : (
    <div className="block h-full">{CardContent}</div>
  );
};

const faqs = [
  {
    q: "چقدر طول می‌کشد پاسخ دریافت کنیم؟",
    a: "معمولاً کمتر از ۲۴ ساعت پاسخ داده می‌شود.",
  },
  { q: "آیا پشتیبانی تلفنی دارید؟", a: "بله، از ساعت ۹ تا ۱۸ پاسخگو هستیم." },
  { q: "آیا امکان همکاری وجود دارد؟", a: "بله، از طریق فرم پیام دهید." },
  {
    q: "آیا اطلاعات من محرمانه است؟",
    a: "بله، اطلاعات شما کاملاً محفوظ خواهد ماند.",
  },
];
