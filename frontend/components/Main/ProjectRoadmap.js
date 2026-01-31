"use client";
import React from "react";
import { motion } from "framer-motion";

const ProcessStep = ({ number, title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="flex items-start gap-6 mb-12 group cursor-default"
  >
    {/* عدد بزرگ کناری */}
    <div className="text-5xl md:text-6xl font-black text-primary-accent/20 group-hover:text-primary-accent transition-colors duration-500 font-mono">
      {number}.
    </div>
    
    <div className="text-right pt-2">
      <h3 className="text-2xl font-bold text-text-main mb-2 group-hover:translate-x-[-5px] transition-transform duration-300">
        {title}
      </h3>
      <p className="text-text-faded text-sm leading-relaxed max-w-md">
        {description}
      </p>
    </div>
  </motion.div>
);

const WhyChooseUs = () => {
  const steps = [
    {
      number: "01",
      title: "آخرین تکنولوژی‌ها",
      description: "استفاده از مدرن‌ترین ابزارهای MERN Stack برای پیاده‌سازی پروژه‌های مقیاس‌پذیر و سریع.",
    },
    {
      number: "02",
      title: "راهکارهای منحصر به فرد",
      description: "هر بیزینس چالش‌های خاص خود را دارد؛ من راهکاری متناسب با نیاز دقیق شما طراحی می‌کنم.",
    },
    {
      number: "03",
      title: "استراتژی‌های قدرتمند",
      description: "تحلیل دقیق بازار و رقبا پیش از شروع کدنویسی برای تضمین موفقیت محصول نهایی شما.",
    },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* بخش سمت راست: لیست مراحل */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-text-main text-4xl md:text-5xl font-black mb-6 leading-tight">
                چرا مشتریان ما را <br />
                <span className="text-primary-accent border-b-4 border-primary-accent/20">انتخاب می‌کنند؟</span>
              </h2>
              <p className="text-text-faded text-base max-w-lg">
                ما فقط کد نمی‌زنیم؛ ما ارزش خلق می‌کنیم. فرآیند ما بر پایه شفافیت، سرعت و کیفیت بنا شده است.
              </p>
            </motion.div>

            <div className="flex flex-col">
              {steps.map((step, index) => (
                <ProcessStep key={index} index={index} {...step} />
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-10 py-4 bg-primary-accent text-background font-bold rounded-xl shadow-[0_10px_25px_rgba(0,188,145,0.3)]"
            >
              شروع همکاری
            </motion.button>
          </div>

          {/* بخش سمت چپ: تصویر و هاله نوری */}
          <div className="order-1 lg:order-2 relative flex justify-center items-center">
            {/* هاله نوری پشت تصویر */}
            <div className="absolute w-[80%] h-[80%] bg-primary-accent/10 blur-[120px] rounded-full animate-pulse" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* جایگزین کردن با عکس موجود در پوشه public */}
              <img 
                src="/background/background9.jpg" 
                alt="Our Team" 
                className="w-full max-w-[600px] h-auto rounded-[2rem] drop-shadow-2xl"
              />
              
              {/* تگ شناور Innovation Hub */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-10 -left-6 bg-surface/90 backdrop-blur-md p-4 border border-border rounded-2xl shadow-2xl hidden md:flex items-center gap-3"
              >
                <div className="w-3 h-3 bg-primary-accent rounded-full" />
                <span className="text-text-main text-sm font-bold">دردسترس برای انجام پروژه</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;