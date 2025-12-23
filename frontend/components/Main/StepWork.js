"use client"
import React from 'react';
import { motion } from 'framer-motion';
// استفاده از Lucide React
import { GraduationCap, Briefcase } from 'lucide-react';

const StepWork = () => {
  const education = [
    { title: "کارشناسی ارشد علوم داده", date: "۱۳۹۲ - ۱۳۹۵", desc: "توضیحات مربوط به دوران تحصیل و دستاوردهای شما در این مقطع." },
    { title: "کارشناسی مهندسی کامپیوتر", date: "۱۳۹۵ - ۱۳۹۷", desc: "تمرکز بر یادگیری مبانی برنامه‌نویسی و ساختارهای داده." },
  ];

  const experience = [
    { title: "طراح گرافیک", date: "۱۳۹۸ - ۱۴۰۰", desc: "طراحی رابط کاربری و تجربه کاربری برای پروژه‌های مختلف." },
    { title: "کارآموز طراحی وب", date: "۱۴۰۰ - ۱۴۰۱", desc: "شروع یادگیری حرفه‌ای فرانت‌اند و کار روی پروژه‌های واقعی." },
  ];

  // انیمیشن کانتینر برای پله‌پله ظاهر شدن آیتم‌ها
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const TimelineSection = ({ title, icon: Icon, data }) => (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#1e1e1e] p-3 rounded-xl border border-gray-800 shadow-xl">
          <Icon className="text-[#10b981] w-6 h-6" /> 
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
      </div>

      {/* List Container */}
      <div className="relative border-r-2 border-gray-800 mr-7 pr-8 flex flex-col gap-12">
        {data.map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="relative group"
          >
            {/* Dot (نقطه سبز متحرک) */}
            <motion.div 
              className="absolute -right-[41px] top-1.5 w-4 h-4 rounded-full bg-[#10b981] z-10 border-4 border-[#121212]"
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
            />
            
            {/* محتوای هر مرحله */}
            <div className="transition-transform duration-300 group-hover:-translate-x-2">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#10b981] transition-colors">
                {item.title}
              </h3>
              <span className="inline-block px-3 py-1 rounded-full bg-[#1a2e28] text-[#10b981] text-xs font-bold mb-3">
                {item.date}
              </span>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 md:p-16 lg:p-24 font-[Vazir,Tahoma]" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
        
        <TimelineSection title="تحصیلات" icon={GraduationCap} data={education} />
        <TimelineSection title="تجربیات" icon={Briefcase} data={experience} />

      </div>
    </div>
  );
};

export default StepWork;