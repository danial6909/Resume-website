"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';

const plans = [
  { name: "اقتصادی", monthly: "990,000", yearly: "9,500,000", features: ["پشتیبانی ایمیلی", "گزارش ماهانه", "طراحی تک‌صفحه‌ای"], popular: false },
  { name: "حرفه‌ای", popular: true, monthly: "2,490,000", yearly: "23,000,000", features: ["پشتیبانی 24/7", "سئو پیشرفته", "پنل مدیریت اختصاصی", "مشاوره رایگان"] },
  { name: "سازمانی", monthly: "تماس بگیرید", yearly: "تماس بگیرید", features: ["مدیر حساب اختصاصی", "راهکار سفارشی", "SLA امنیت"], popular: false },
];

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
    <section className="py-32 px-6 bg-[#0f0f0f] border-y border-white/5 relative">
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-4xl font-black mb-8">سرمایه‌گذاری روی <span className="text-[#00bc91]">رشد</span></h2>
        <div className="inline-flex flex-col items-center gap-3 bg-white/[0.03] p-6 rounded-[2rem] border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3 text-white/50 text-xs tracking-widest uppercase">
            <Clock size={14} className="text-[#00bc91] animate-spin-slow" /> مهلت تخفیف ویژه:
          </div>
          <span className="text-3xl font-mono font-bold text-white tracking-tighter">{formatTime(timer)}</span>
        </div>
      </div>

      <div className="flex justify-center mb-20">
        <div className="bg-white/5 p-1.5 rounded-2xl flex items-center border border-white/5">
          {["monthly", "yearly"].map((type) => (
            <button 
              key={type} onClick={() => setBilling(type)}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${billing === type ? 'bg-[#00bc91] text-black shadow-lg shadow-[#00bc91]/20' : 'text-white/40 hover:text-white'}`}
            >
              {type === "monthly" ? "ماهانه" : "سالانه (20% Off)"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {plans.map((p, i) => (
          <motion.div 
            key={i} whileHover={{ scale: 1.02 }}
            className={`relative p-12 rounded-[3.5rem] border transition-all duration-500 ${p.popular ? 'border-[#00bc91] bg-[#00bc91]/5 shadow-[0_40px_80px_-20px_rgba(0,188,145,0.15)]' : 'border-white/5 bg-white/[0.02]'} flex flex-col h-full`}
          >
            {p.popular && <div className="absolute -top-5 right-10 bg-[#00bc91] text-black px-6 py-1.5 rounded-full text-xs font-black shadow-xl shadow-[#00bc91]/20">MOST POPULAR</div>}
            <h3 className="text-xl font-bold mb-6 text-white/60">{p.name}</h3>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tighter">{billing === "monthly" ? p.monthly : p.yearly}</span>
              <span className="text-white/20 text-sm">تومان</span>
            </div>
            <div className="space-y-5 mb-12 flex-grow">
              {p.features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-4 text-sm text-white/50 group cursor-default">
                  <div className="p-1 rounded-md bg-[#00bc91]/10 group-hover:bg-[#00bc91]/30 transition-all"><Check size={14} className="text-[#00bc91]" /></div>
                  {f}
                </div>
              ))}
            </div>
            <button className={`w-full py-5 rounded-[1.5rem] font-black text-sm transition-all ${p.popular ? 'bg-[#00bc91] text-black hover:shadow-[0_20px_40px_-10px_rgba(0,188,145,0.4)]' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
              انتخاب پلن و شروع
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}