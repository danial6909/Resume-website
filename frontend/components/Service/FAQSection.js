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
    <section className="py-32 px-6 max-w-3xl mx-auto" dir="rtl">
      {/* استفاده از text-text-main برای هماهنگی با لایت مود */}
      <h2 className="text-4xl font-black text-center mb-20 tracking-tight text-text-main">
        پاسخ به <span className="text-primary-accent">ابهامات</span> شما
      </h2>
      
      <div className="space-y-4 ">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b border-border/50 last:border-0 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(isOpen ? null : index)} 
                className="w-full py-6 px-5 flex items-center justify-between text-right group transition-all cursor-pointer"
              >
                {/* اصلاح انیمیشن جابه‌جایی متن: استفاده از -translate-x برای جهت فارسی */}
                <span className={`text-lg font-bold transition-all duration-300 ${
                  isOpen 
                  ? 'text-primary-accent -translate-x-2' 
                  : 'text-text-faded group-hover:text-text-main'
                }`}>
                  {faq.q}
                </span>

        <div className={`p-2 rounded-lg transition-all duration-500 ${
  isOpen 
  ? 'bg-primary-accent/20 rotate-180' 
  : 'bg-surface shadow-sm' // حذف border مستقیم برای جلوگیری از خط سفید موقع چرخش
}`}>
  <ChevronDown 
    size={18} 
    className={`transition-colors duration-300 ${isOpen ? 'text-primary-accent' : 'text-text-faded'}`} 
  />
</div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {/* اصلاح رنگ متن پاسخ برای خوانایی در هر دو مود */}
                    <p className="pb-6 text-text-faded leading-relaxed text-sm md:text-base border-r-2 border-primary-accent pr-4 mr-1">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}