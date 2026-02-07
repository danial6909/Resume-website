"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "مدت زمان اجرای پروژه‌ها چقدر است؟", a: "بسته به پیچیدگی پروژه از ۷ تا ۴۵ روز کاری متغیر است." },
  { q: "آیا پس از تحویل، پشتیبانی هم ارائه می‌دهید؟", a: "بله، تمامی پلن‌ها دارای دوره پشتیبانی رایگان هستند." },
  { q: "امکان پرداخت اقساطی وجود دارد؟", a: "بله، برای پروژه‌های حرفه‌ای و سازمانی شرایط پرداخت مرحله‌ای فراهم است." }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-32 px-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-black text-center mb-20 tracking-tight">پاسخ به <span className="text-[#00bc91]">ابهامات</span> شما</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-white/5 last:border-0 overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)} 
              className="w-full py-6 flex items-center justify-between text-right group transition-all"
            >
              <span className={`text-lg font-bold transition-all duration-300 ${openIndex === index ? 'text-[#00bc91] translate-x-2' : 'text-white/70 group-hover:text-white'}`}>{faq.q}</span>
              <div className={`p-2 rounded-lg transition-all ${openIndex === index ? 'bg-[#00bc91]/20 rotate-180' : 'bg-white/5'}`}>
                <ChevronDown size={18} className={openIndex === index ? 'text-[#00bc91]' : 'text-white/30'} />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="pb-6 text-white/50 leading-relaxed text-sm md:text-base border-r-2 border-[#00bc91] pr-4 mr-2">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}