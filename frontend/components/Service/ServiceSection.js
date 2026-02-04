// "use client";

// import { motion } from "framer-motion";
// import { CheckCircle, Crown, Sparkles } from "lucide-react";
// import { useState, useEffect } from "react";
// import TitleHeaderPages from "../TitleHeaderPages";

// export default function Services() {
//   const [billing, setBilling] = useState("monthly");
//   const [timer, setTimer] = useState(3600);

//   useEffect(() => {
//     const i = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(i);
//   }, []);

//   const formatTime = (t) => {
//     const h = String(Math.floor(t / 3600)).padStart(2, "0");
//     const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
//     const s = String(t % 60).padStart(2, "0");
//     return `${h}:${m}:${s}`;
//   };

//   return (
//     <>
//       <div
//         className=" bg-background pt-10 px-6 mx-auto font-[vazir] max-w-7xl "
//         dir="rtl"
//       >
//         {/* header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 ">
//           <TitleHeaderPages title1="Service" title2="خدمات " />
//         </div>
//       </div>

//       <section
//         dir="rtl"
//         className="min-h-screen bg-background text-main px-6 pb-20"
//       >
//         {/* Header */}
     

//         {/* Service Cards */}
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-28">
//           {services.map((s, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               whileHover={{ y: -8 }}
//               className="bg-surface border border-border rounded-2xl p-8"
//             >
//               <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
//               <p className="text-muted text-sm">{s.desc}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Pricing Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-6xl mx-auto text-center mb-10"
//         >
//           <h2 className="text-4xl font-bold mb-4">پلن‌های اشتراکی</h2>
//           <p className="text-faded">تخفیف ویژه فقط تا</p>
//           <div className="text-primary-accent text-2xl font-bold mt-2">
//             {formatTime(timer)}
//           </div>
//         </motion.div>

//         {/* Capsule Switch */}
//         <div className="flex justify-center mb-16">
//           <div className="relative bg-surface p-1 rounded-full w-72 border border-border">
//             <motion.div
//               layout
//               className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-primary-accent to-secondary-accent ${
//                 billing === "monthly" ? "right-1" : "left-1"
//               }`}
//             />

//             <div className="relative grid grid-cols-2 text-center text-sm">
//               <button
//                 onClick={() => setBilling("monthly")}
//                 className="py-2 z-10"
//               >
//                 ماهانه
//               </button>
//               <button
//                 onClick={() => setBilling("yearly")}
//                 className="py-2 z-10"
//               >
//                 سالانه (20٪ تخفیف)
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Plans */}
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-24">
//           {plans.map((p, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               whileHover={{ scale: 1.04 }}
//               className={`relative bg-surface p-8 rounded-2xl border border-border shadow-xl overflow-hidden ${
//                 p.popular && "ring-2 ring-primary-accent"
//               }`}
//             >
//               {/* Glow */}
//               {p.popular && (
//                 <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/20 to-transparent pointer-events-none" />
//               )}

//               {p.popular && (
//                 <span className="absolute top-5 left-5 text-xs bg-primary-accent text-black px-4 py-1 rounded-full flex items-center gap-1">
//                   <Sparkles size={14} /> ویژه
//                 </span>
//               )}

//               <div className="relative">
//                 <div className="flex items-center gap-2 mb-4">
//                   {p.popular && <Crown className="text-primary-accent" />}
//                   <h3 className="text-2xl font-bold">{p.name}</h3>
//                 </div>

//                 <p className="text-4xl font-extrabold mb-4">
//                   {billing === "monthly" ? p.price : p.yearly}
//                   <span className="text-sm text-faded"> / {billing}</span>
//                 </p>

//                 <ul className="space-y-3 mb-8">
//                   {p.features.map((f, idx) => (
//                     <li key={idx} className="flex items-center gap-2">
//                       <CheckCircle size={16} className="text-primary-accent" />
//                       <span className="text-faded">{f}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <button
//                   onClick={() => alert("اتصال به زرین پال")}
//                   className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-accent to-secondary-accent hover:opacity-90"
//                 >
//                   شروع اشتراک
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Compare Table */}
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-8">مقایسه پلن‌ها</h2>

//           <div className="overflow-x-auto">
//             <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
//               <thead className="bg-surface">
//                 <tr>
//                   <th className="p-4 text-right">امکانات</th>
//                   <th className="p-4">اقتصادی</th>
//                   <th className="p-4">حرفه‌ای</th>
//                   <th className="p-4">سازمانی</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {compare.map((row, i) => (
//                   <tr key={i} className="border-t border-border">
//                     <td className="p-4">{row.name}</td>
//                     <td className="p-4 text-center">{row.basic}</td>
//                     <td className="p-4 text-center">{row.pro}</td>
//                     <td className="p-4 text-center">{row.enterprise}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// const services = [
//   { title: "طراحی سایت", desc: "طراحی حرفه‌ای و ریسپانسیو برای برند شما" },
//   { title: "سئو و بهینه‌سازی", desc: "افزایش رتبه سایت در گوگل" },
//   { title: "دیجیتال مارکتینگ", desc: "افزایش فروش و جذب مشتری" },
//   { title: "دیجیتال مارکتینگ", desc: "افزایش فروش و جذب مشتری" },
//   { title: "دیجیتال مارکتینگ", desc: "افزایش فروش و جذب مشتری" },
//   { title: "دیجیتال مارکتینگ", desc: "افزایش فروش و جذب مشتری" },
// ];

// const plans = [
//   {
//     name: "اقتصادی",
//     price: "990,000",
//     yearly: "9,500,000",
//     features: ["پشتیبانی ایمیلی", "گزارش ماهانه"],
//   },
//   {
//     name: "حرفه‌ای",
//     popular: true,
//     price: "2,490,000",
//     yearly: "23,000,000",
//     features: ["پشتیبانی 24/7", "سئو پیشرفته", "مشاوره اختصاصی"],
//   },
//   {
//     name: "سازمانی",
//     price: "تماس",
//     yearly: "تماس",
//     features: ["مدیر حساب", "راهکار سفارشی", "SLA"],
//   },
// ];

// const compare = [
//   { name: "پشتیبانی", basic: "ایمیلی", pro: "24/7", enterprise: "اختصاصی" },
//   { name: "سئو", basic: "❌", pro: "✔️", enterprise: "✔️" },
//   { name: "مشاوره", basic: "❌", pro: "✔️", enterprise: "✔️" },
// ];




"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Crown, 
  Sparkles, 
  Layers, 
  Zap, 
  Globe, 
  Shield, 
  MessageSquare, 
  Clock, 
  ArrowRight,
  Check,
  ChevronDown
} from 'lucide-react';

/**
 * کامپوننت خدمات (service.js)
 * شامل: هیرو، لیست خدمات، قیمت‌گذاری، جدول مقایسه و سوالات متداول
 */

const services = [
  { title: "توسعه Full-stack", desc: "طراحی و پیاده‌سازی سیستم‌های پیچیده با پشته MERN.", icon: <Layers size={24} /> },
  { title: "طراحی UI/UX", desc: "خلق رابط کاربری‌های جذاب با تمرکز بر تجربه کاربر.", icon: <Sparkles size={24} /> },
  { title: "سئو و بهینه‌سازی", desc: "افزایش رتبه سایت و سرعت لود برای موتورهای جستجو.", icon: <Zap size={24} /> },
  { title: "امنیت داده‌ها", desc: "ایمن‌سازی دیتابیس و جلوگیری از نفوذ و حملات.", icon: <Shield size={24} /> },
  { title: "دیجیتال مارکتینگ", desc: "استراتژی‌های نوین برای جذب مشتری و افزایش فروش.", icon: <Globe size={24} /> },
  { title: "مشاوره فنی", desc: "راهنمایی برای انتخاب بهترین تکنولوژی‌های روز دنیا.", icon: <MessageSquare size={24} /> },
];

const plans = [
  {
    name: "اقتصادی",
    monthly: "990,000",
    yearly: "9,500,000",
    features: ["پشتیبانی ایمیلی", "گزارش ماهانه", "طراحی تک‌صفحه‌ای"],
    popular: false,
  },
  {
    name: "حرفه‌ای",
    popular: true,
    monthly: "2,490,000",
    yearly: "23,000,000",
    features: ["پشتیبانی 24/7", "سئو پیشرفته", "پنل مدیریت اختصاصی", "مشاوره رایگان"],
  },
  {
    name: "سازمانی",
    monthly: "تماس بگیرید",
    yearly: "تماس بگیرید",
    features: ["مدیر حساب اختصاصی", "راهکار سفارشی", "امنیت پیشرفته (SLA)"],
    popular: false,
  },
];

const compareData = [
  { name: "پشتیبانی فنی", basic: "ایمیلی", pro: "24/7", enterprise: "اختصاصی" },
  { name: "سئو پیشرفته", basic: "❌", pro: "✔️", enterprise: "✔️" },
  { name: "پنل مدیریت MERN", basic: "❌", pro: "✔️", enterprise: "✔️" },
  { name: "تست نفوذ", basic: "❌", pro: "❌", enterprise: "✔️" },
];

const faqs = [
  { q: "مدت زمان اجرای پروژه‌ها چقدر است؟", a: "بسته به پیچیدگی پروژه از ۷ تا ۴۵ روز کاری متغیر است." },
  { q: "آیا پس از تحویل، پشتیبانی هم ارائه می‌دهید؟", a: "بله، تمامی پلن‌ها دارای دوره پشتیبانی رایگان هستند." },
  { q: "امکان پرداخت اقساطی وجود دارد؟", a: "بله، برای پروژه‌های حرفه‌ای و سازمانی شرایط پرداخت مرحله‌ای فراهم است." }
];

// کامپوننت داخلی برای هر آیتم سوالات متداول
const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-right group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-[#00bc91]' : 'text-white/80 group-hover:text-white'}`}>
          {faq.q}
        </span>
        <ChevronDown 
          size={20} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00bc91]' : 'text-white/30'}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/50 leading-relaxed text-sm md:text-base">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Service() {
  const [billing, setBilling] = useState("monthly");
  const [timer, setTimer] = useState(3600 * 2 + 450);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => {
    const h = String(Math.floor(t / 3600)).padStart(2, "0");
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-[#00bc91]/30" dir="rtl">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 bg-[#00bc91]/10 blur-[120px] rounded-full -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[#00bc91] font-bold tracking-widest text-sm uppercase px-4 py-1 bg-[#00bc91]/10 rounded-full">Our Expertise</span>
          <h1 className="text-4xl md:text-6xl font-black mt-8 mb-6 leading-tight">
            خدمات حرفه‌ای <br/> برای <span className="text-[#00bc91]">دنیای مدرن</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            ما با استفاده از جدیدترین پشته‌های تکنولوژی، ایده‌های شما را به نرم‌افزارهای مقیاس‌پذیر تبدیل می‌کنیم.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: '#00bc91' }}
              className="bg-[#1a1a1a] border border-white/5 p-8 rounded-[2rem] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#00bc91]/10 text-[#00bc91] rounded-2xl flex items-center justify-center mb-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-black mb-6">پلن‌های اشتراکی</h2>
          <div className="inline-flex flex-col items-center gap-2 bg-[#1a1a1a] p-4 rounded-2xl border border-white/5 shadow-xl">
            <p className="text-white/40 text-sm flex items-center gap-2">
              <Clock size={16} className="text-[#00bc91]" /> تخفیف ویژه فقط تا:
            </p>
            <span className="text-2xl font-mono font-bold text-[#00bc91]">{formatTime(timer)}</span>
          </div>
        </div>

        {/* Capsule Switch */}
        <div className="flex justify-center mb-16">
          <div className="relative bg-[#1a1a1a] p-1 rounded-full w-72 border border-white/5 flex items-center h-12">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`absolute h-10 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-[#00bc91] to-[#3b82f6] ${
                billing === "monthly" ? "right-1" : "left-1"
              }`}
            />
            <button
              onClick={() => setBilling("monthly")}
              className={`relative z-10 w-1/2 text-sm font-bold transition-colors ${billing === "monthly" ? "text-black" : "text-white/50"}`}
            >
              ماهانه
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`relative z-10 w-1/2 text-sm font-bold transition-colors ${billing === "yearly" ? "text-black" : "text-white/50"}`}
            >
              سالانه <span className="text-[9px] opacity-70">(20% OFF)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 ${
                p.popular 
                ? 'border-[#00bc91] bg-[#00bc91]/5 shadow-[0_0_40px_rgba(0,188,145,0.1)]' 
                : 'border-white/5 bg-[#1a1a1a]'
              } flex flex-col h-full`}
            >
              {p.popular && (
                <div className="absolute top-6 left-6 text-[#00bc91]">
                  <Crown size={28} />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <div className="mb-8">
                <span className="text-4xl font-black tracking-tight">
                  {billing === "monthly" ? p.monthly : p.yearly}
                </span>
                <span className="text-white/30 text-sm mr-2 font-medium">تومان</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-white/60">
                    <CheckCircle size={18} className="text-[#00bc91] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
                p.popular 
                ? 'bg-[#00bc91] text-black hover:shadow-[0_0_20px_rgba(0,188,145,0.4)]' 
                : 'bg-white/5 hover:bg-white/10 border border-white/5 text-white'
              }`}>
                انتخاب پلن
              </button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto mt-32">
          <h3 className="text-3xl font-bold text-center mb-12">مقایسه دقیق امکانات</h3>
          <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-[#1a1a1a] shadow-2xl">
            <table className="w-full text-right">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-6 text-sm font-bold text-white/80">ویژگی‌های اصلی</th>
                  <th className="p-6 text-center text-sm font-bold text-white/80">اقتصادی</th>
                  <th className="p-6 text-center text-sm font-bold text-white/80">حرفه‌ای</th>
                  <th className="p-6 text-center text-sm font-bold text-white/80">سازمانی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {compareData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-sm text-white/50">{row.name}</td>
                    <td className="p-6 text-center text-sm">
                      {row.basic === "✔️" ? <Check size={18} className="mx-auto text-[#00bc91]" /> : row.basic}
                    </td>
                    <td className="p-6 text-center text-sm font-bold text-[#00bc91]">
                      {row.pro === "✔️" ? <Check size={18} className="mx-auto" /> : row.pro}
                    </td>
                    <td className="p-6 text-center text-sm font-bold text-[#3b82f6]">
                      {row.enterprise === "✔️" ? <Check size={18} className="mx-auto" /> : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#00bc91] font-bold text-sm uppercase tracking-widest bg-[#00bc91]/10 px-4 py-1 rounded-full">Support</span>
          <h2 className="text-4xl font-black mt-6">سوالات متداول</h2>
        </div>
        <div className="bg-[#1a1a1a] border border-white/5 rounded-[2.5rem] px-8 py-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              isOpen={openFaqIndex === index} 
              onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-12 md:p-20 rounded-[3.5rem] border border-white/5 relative overflow-hidden group shadow-2xl">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00bc91]/10 rounded-full blur-[80px] group-hover:bg-[#00bc91]/20 transition-all duration-700" />
          <h2 className="text-3xl md:text-5xl font-black mb-8 italic tracking-tighter">READY TO SCALE?</h2>
          <p className="text-white/50 mb-10 text-lg">همین حالا برای شروع یک تغییر بزرگ با ما تماس بگیرید.</p>
          <button className="bg-[#00bc91] text-black px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all flex items-center gap-3 mx-auto shadow-xl shadow-[#00bc91]/20">
            رزرو مشاوره رایگان <ArrowRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
}