"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check, Sparkles, Zap, ArrowLeft } from "lucide-react";

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
    features: [
      "پشتیبانی 24/7",
      "سئو پیشرفته",
      "پنل مدیریت اختصاصی",
      "مشاوره رایگان",
    ],
  },
  {
    name: "سازمانی",
    monthly: "5,900,000",
    yearly: "56,000,000",
    features: ["مدیر حساب اختصاصی", "راهکار سفارشی", "SLA امنیت"],
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

export default function PricingPlans() {
  const [billing, setBilling] = useState("monthly");
  const [timer, setTimer] = useState(3600 * 2 + 450);

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
    <section className="py-32 px-6 bg-background border-y border-border relative overflow-hidden font-[vazir]" dir="rtl">
      
      {/* هاله‌های نوری استراتژیک در گوشه‌ها */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-accent/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* هدر و تایمر */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-10 text-text-main"
          >
            پلن‌های <span className="text-primary-accent">هوشمند</span> توسعه
          </motion.h2>

          <div className="inline-flex items-center gap-6 bg-surface/50 border border-border px-8 py-4 rounded-[2rem] backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">تخفیف ویژه تا:</span>
              <span className="text-3xl font-mono font-bold text-text-main tabular-nums">{formatTime(timer)}</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <Clock className="text-primary-accent animate-pulse" size={28} />
          </div>
        </div>

        {/* سوییچ کپسولی */}
  {/* سوییچ Magnetic Pill فارسی */}
<div className="flex justify-center mb-20" dir="rtl">
  <div className="relative bg-surface/60 backdrop-blur-xl border border-border p-2 rounded-[2.5rem] flex items-center w-80 h-16 shadow-lg shadow-black/20 ">
    {["monthly", "yearly"].map((type) => {
      const isActive = billing === type;
      return (
        <button
          key={type}
          onClick={() => setBilling(type)}
          className="relative flex-1 h-full flex items-center justify-center transition-all duration-300 cursor-pointer"
        >
          {/* کپسول فعال متحرک */}
          {isActive && (
            <motion.div
              layoutId="activeMagneticTab"
              className="absolute inset-0 bg-primary-accent rounded-[2rem] shadow-[0_10px_20px_-5px_rgba(0,188,145,0.4)]"
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                mass: 0.8
              }}
            />
          )}
          
          <span className={`relative z-10 text-[13px] font-black transition-all duration-300 ${
            isActive 
            ? "text-background scale-105" 
            : "text-text-faded hover:text-text-main"
          }`}>
            {type === "monthly" ? "پرداخت ماهانه" : "اشتراک سالانه"}
          </span>

          {/* نقطه نوری زیر متن فعال برای زیبایی */}
          {isActive && (
            <motion.div 
              layoutId="dotIndicator"
              className="absolute bottom-1.5 w-1 h-1 bg-background rounded-full z-20"
            />
          )}
        </button>
      );
    })}
  </div>
</div>

        {/* شبکه کارت‌ها */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((p, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className={`group relative p-[1px] rounded-[3rem] transition-all duration-500 ${
                p.popular ? 'bg-gradient-to-b from-primary-accent to-transparent' : 'bg-border hover:bg-primary-accent/40'
              }`}
            >
              {/* بدنه داخلی کارت */}
              <div className="relative flex flex-col h-full bg-surface rounded-[2.9rem] p-10 overflow-hidden shadow-xl">
                
                {p.popular && (
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-accent/10 blur-3xl rounded-full pointer-events-none" />
                )}

                <div className="relative z-10 mb-8 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-text-muted tracking-widest uppercase">{p.name}</h3>
                  {p.popular && (
                    <span className="bg-primary-accent/10 text-primary-accent text-[10px] font-black px-3 py-1 rounded-full border border-primary-accent/20 flex items-center gap-1">
                      <Sparkles size={10} /> پیشنهادی
                    </span>
                  )}
                </div>

                <div className="relative z-10 mb-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={billing}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-baseline gap-2"
                    >
                      <span className="text-5xl font-black text-text-main tracking-tighter tabular-nums">
                        {billing === "monthly" ? p.monthly : p.yearly}
                      </span>
                      <span className="text-text-muted text-xs font-bold uppercase">تومان</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ویژگی‌ها */}
                <div className="relative z-10 space-y-5 mb-12 flex-grow">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-sm text-text-faded group/item">
                      <div className="w-2 h-2 rounded-full bg-primary-accent shadow-[0_0_8px_rgba(0,188,145,0.6)] transition-transform group-hover/item:scale-125" />
                      {f}
                    </div>
                  ))}
                </div>

                {/* دکمه اکشن */}
                <div className="relative z-10 mt-auto">
                  <button className={`group/btn w-full py-5 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-3 ${
                    p.popular 
                    ? 'bg-primary-accent text-background shadow-lg shadow-primary-accent/20 hover:scale-[1.02]' 
                    : 'bg-background text-text-main border border-border hover:border-primary-accent'
                  }`}>
                    {p.popular && <Zap size={18} fill="currentColor" />}
                    انتخاب پلن
                    <ArrowLeft size={18} className="transition-transform group-hover/btn:-translate-x-2" />
                  </button>
                </div>

                {/* --- همان خط نوری زیرین که می‌خواستی --- */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary-accent group-hover:w-full transition-all duration-700 shadow-[0_0_15px_#00bc91]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}