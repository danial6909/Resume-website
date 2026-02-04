"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "../Resume/animations";
import TitleHeaderPages from "../TitleHeaderPages";

const Portfolio = () => {
  const categories = ["همه", "طراحی وب", "اپلیکیشن‌ها", "طراحی گرافیک"];

  const projects = [
    {
      id: 1,
      title: "طراحی داشبورد",
      category: "طراحی وب",
      desc: "یک سیستم مدیریت داده پیشرفته با قابلیت شخصی‌سازی بالا.",
      image: "/logo/img1.jpg",
    },
    {
      id: 2,
      title: "اپلیکیشن مالی",
      category: "اپلیکیشن‌ها",
      desc: "رابط کاربری مدرن برای مدیریت تراکنش‌های مالی.",
      image: "/logo/img2.jpg",
    },
    {
      id: 3,
      title: "پلتفرم رشد",
      category: "طراحی وب",
      desc: "بهینه‌سازی نرخ تبدیل و تحلیل داده‌های کاربران.",
      image: "/logo/img3.jpg",
    },
    {
      id: 4,
      title: "کیف پول دیجیتال",
      category: "اپلیکیشن‌ها",
      desc: "امنیت بالا در کنار سادگی برای نگهداری دارایی‌ها.",
      image: "/logo/img4.jpg",
    },
    {
      id: 5,
      title: "داشبورد مدیریت",
      category: "طراحی وب",
      desc: "کنترل کامل روی منابع انسانی و پروژه‌های تیمی.",
      image: "/logo/img5.jpg",
    },
    {
      id: 6,
      title: "دیزاین برند",
      category: "طراحی گرافیک",
      desc: "هویت بصری یکپارچه برای استارتاپ‌های نوپا.",
      image: "/logo/img6.jpg",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("همه");

  const filteredProjects =
    activeCategory === "همه"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div
      className="min-h-screen bg-background py-10 px-6 font-[vazir]"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 ">
        {/* هدر و فیلتر با انیمیشن Framer Motion */}
        <TitleHeaderPages title1="Portfolio" title2="پروژه های "/>

          {/* منوی فیلتر کپسولی با انیمیشن ورودی */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1 bg-surface p-1 rounded-full border border-border shadow-2xl"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 text-sm cursor-pointer font-bold transition-colors duration-300 z-10 font-sans ${
                  activeCategory === cat
                    ? "text-background"
                    : "text-text-faded hover:text-text-main"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 bg-primary-accent rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </motion.div>

        </div>

       

        {/* گرید پروژه‌ها */}
        <motion.div
          layout // مدیریت جابه‌جایی نرم کارت‌ها هنگام فیلتر
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                // انیمیشن ورود و خروج هر کارت
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { delay: index * 0.2 }, // کارت‌ها یکی‌یکی با تاخیر ظاهر می‌شوند
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -5 }} // یک تکان کوچک به سمت بالا در هنگام هاور کل کارت
                className="relative h-[300px] w-full group [perspective:1000px]"
              >
                {/* کارت اصلی */}
                <div className="relative w-full h-full rounded-2xl transition-all duration-500 border border-border overflow-hidden group-hover:scale-105 border-3 border-primary-accent shadow-lg group-hover:shadow-primary-accent/20">
                  {/* تصویر پس‌زمینه */}
                  <img
                    src={project.image}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    alt={project.title}
                  />

                  {/* لایه تیره روی عکس برای خوانایی بیشتر در حالت عادی */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                  {/* بخش محتوا - ۴۰ تا ۵۰ درصد بالا می‌آید */}
                  <div className="absolute left-0 bottom-0 w-full h-[50%] p-6 bg-white opacity-90 transition-all duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] [transform-origin:bottom] [transform:rotateX(-90deg)] group-hover:[transform:rotateX(0deg)] flex flex-col justify-start z-20 font-sans">
                    <h3 className="text-black text-xl font-bold mb-2 font-sans">
                      {project.title}
                    </h3>
                    <p className="text-black font-extrabold text-[15px] leading-snug line-clamp-2 font-sans">
                      {project.desc}
                    </p>

                    <button className="mt-auto text-primary-accent text-sm font-bold flex items-center gap-1 cursor-pointer hover:gap-3 transition-all">
                      مشاهده پروژه
                      <span className="text-lg">←</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
