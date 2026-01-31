"use client";
import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion, useTransform } from "framer-motion";
import { Briefcase, Users, Code2, Terminal } from "lucide-react";

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 25 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) setTimeout(() => motionValue.set(value), 400);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref} className="font-mono tracking-tighter">0</span>;
};

const StatCard = ({ stat, index }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // تنظیمات چرخش ۳ بعدی
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 150 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 150 });

  // افکت Spotlight (نور تعقیب‌کننده موس)
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ 
        rotateX: springRotateX, 
        rotateY: springRotateY, 
        transformStyle: "preserve-3d",
        perspective: "1000px" 
      }}
      className="relative group bg-surface rounded-3xl p-[1.5px] overflow-hidden cursor-default"
    >
      {/* ۱. انیمیشن بردر فوق پیشرفته (Border Beam) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-[-100%] aspect-square bg-[conic-gradient(from_0deg,transparent_0,transparent_25%,var(--primary-accent)_50%,transparent_75%,transparent_100%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* ۲. لایه Spotlight که با حرکت موس جا‌به‌جا می‌شود */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(0, 188, 145, 0.1), transparent 40%)`
        }}
      />

      {/* محتوای اصلی کارت */}
      <div className="relative z-20 bg-background rounded-[calc(1.5rem-1px)] p-8 h-full flex flex-col border border-border">
        
        {/* هدر با آیکون */}
        <div className="flex justify-between items-center mb-10" style={{ transform: "translateZ(40px)" }}>
          <div className="p-3 bg-background border border-primary-accent/20 rounded-2xl text-primary-accent group-hover:bg-primary-accent group-hover:text-background transition-all duration-500 shadow-lg shadow-primary-accent/5">
            {stat.icon}
          </div>
          <div className="h-[2px] w-8 bg-primary-accent/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary-accent w-0 group-hover:w-full transition-all duration-1000" />
          </div>
        </div>

        {/* بخش اعداد و متن */}
        <div style={{ transform: "translateZ(60px)" }} className="text-right">
          <div className="flex items-baseline gap-2 justify-end">
             <span className="text-4xl font-black text-primary-accent order-1 drop-shadow-[0_0_15px_rgba(0,188,145,0.4)] transition-all group-hover:scale-110 duration-500">
                {stat.suffix}
             </span>
             <h3 className="text-5xl font-extrabold text-text-main order-2">
              <AnimatedNumber value={stat.value} />
            </h3>
          </div>
          <p className="mt-4 text-text-faded text-[14px] font-semibold tracking-wide group-hover:text-text-main transition-colors duration-300">
            {stat.label}
          </p>
        </div>

        {/* گوشه‌های متحرک تزیینی */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
            <div className="w-4 h-4 border-t-2 border-r-2 border-primary-accent" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0">
            <div className="w-4 h-4 border-b-2 border-l-2 border-primary-accent" />
        </div>
      </div>
    </motion.div>
  );
};

const NumberWork = () => {
  const stats = [
    { id: 1, label: "پروژه‌های موفق", value: 100, suffix: "+", icon: <Briefcase size={22} /> },
    { id: 2, label: "رضایت کارفرمایان", value: 100, suffix: "%", icon: <Users size={22} /> },
    { id: 3, label: "تکنولوژی‌های مدرن", value: 15, suffix: "+", icon: <Code2 size={22} /> },
    { id: 4, label: "ساعت‌ها کدنویسی", value: 2500, suffix: "+", icon: <Terminal size={22} /> },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumberWork;