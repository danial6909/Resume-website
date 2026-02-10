"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, Zap, Shield, Globe, MessageSquare } from 'lucide-react';

const services = [
  { title: "توسعه Full-stack", desc: "طراحی و پیاده‌سازی سیستم‌های پیچیده با پشته MERN.", icon: <Layers size={24} /> },
  { title: "طراحی UI/UX", desc: "خلق رابط کاربری‌های جذاب با تمرکز بر تجربه کاربر.", icon: <Sparkles size={24} /> },
  { title: "سئو و بهینه‌سازی", desc: "افزایش رتبه سایت و سرعت لود برای موتورهای جستجو.", icon: <Zap size={24} /> },
  { title: "امنیت داده‌ها", desc: "ایمن‌سازی دیتابیس و جلوگیری از نفوذ و حملات.", icon: <Shield size={24} /> },
  { title: "دیجیتال مارکتینگ", desc: "استراتژی‌های نوین برای جذب مشتری و افزایش فروش.", icon: <Globe size={24} /> },
  { title: "مشاوره فنی", desc: "راهنمایی برای انتخاب بهترین تکنولوژی‌های روز دنیا.", icon: <MessageSquare size={24} /> },
];

export default function ServiceGrid() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.03)" }}
            className="group relative bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00bc91]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
            <div className="w-14 h-14 bg-[#00bc91]/10 text-[#00bc91] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#00bc91] group-hover:text-black transition-all duration-500 shadow-xl shadow-[#00bc91]/10">
              {s.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00bc91] transition-colors">{s.title}</h3>
            <p className="text-white/40 group-hover:text-white/60 leading-relaxed text-sm transition-all">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}