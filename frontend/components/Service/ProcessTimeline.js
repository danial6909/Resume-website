// "use client"
// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { 
//   Search, PenTool, Database, Code2, ShieldCheck, Rocket 
// } from 'lucide-react';

// const steps = [
//   { title: "تحلیل نیازمندی‌ها", desc: "بررسی معماری دیتابیس (Schema Design) و مستندسازی APIها.", icon: <Search />, color: "#00bc91" },
//   { title: "طراحی UI/UX", desc: "خلق Prototype‌های تعاملی در Figma با رعایت اصول دسترسی‌پذیری.", icon: <PenTool />, color: "#3b82f6" },
//   { title: "توسعه Backend", desc: "پیاده‌سازی سرور با Node.js، مدیریت JWT و اتصال به MongoDB.", icon: <Database />, color: "#a855f7" },
//   { title: "پیاده‌سازی Frontend", desc: "کدنویسی کلاینت با Next.js و مدیریت State با Redux یا Query.", icon: <Code2 />, color: "#60a5fa" },
//   { title: "تست و امنیت", desc: "تست واحد، ایمن‌سازی در برابر حملات و بهینه‌سازی سرعت لود.", icon: <ShieldCheck />, color: "#fbbf24" },
//   { title: "استقرار و پرتاب", desc: "دیپلوی روی سرورهای ابری و مانیتورینگ دائمی پایداری پروژه.", icon: <Rocket />, color: "#ec4899" },
// ];

// export default function ProcessTimeline() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end end"]
//   });

//   const pathLength = useSpring(scrollYProgress, { stiffness: 30, damping: 20 });

//   return (
//     <section ref={containerRef} className="py-32 px-6 relative max-w-7xl mx-auto overflow-hidden">
//       <div className="text-center mb-40 relative">
//           <motion.h2 className="text-7xl md:text-[12rem] font-black absolute inset-0 -top-20 opacity-[0.03] select-none text-white">ROUTE</motion.h2>
//           <h3 className="text-4xl md:text-6xl font-black relative z-10">نقشه <span className="text-[#00bc91]">استراتژیک</span> پروژه</h3>
//       </div>
      
//       <div className="relative">
//         {/* مسیر منحنی SVG مخصوص دسکتاپ */}
//         <div className="absolute inset-0 hidden lg:block pointer-events-none" aria-hidden="true">
//           <svg width="100%" height="100%" viewBox="0 0 400 1200" fill="none" preserveAspectRatio="none">
//             {/* مسیر کمرنگ پس‌زمینه */}
//             <path 
//               d="M200 0 C200 100, 350 150, 350 300 C350 450, 50 450, 50 600 C50 750, 350 750, 350 900 C350 1050, 200 1100, 200 1200" 
//               stroke="rgba(255,255,255,0.05)" 
//               strokeWidth="4" 
//             />
//             {/* مسیر درخشان متحرک با اسکرول */}
//             <motion.path 
//               d="M200 0 C200 100, 350 150, 350 300 C350 450, 50 450, 50 600 C50 750, 350 750, 350 900 C350 1050, 200 1100, 200 1200" 
//               stroke="url(#gradient-line)" 
//               strokeWidth="4" 
//               strokeLinecap="round"
//               style={{ pathLength }}
//             />
//             <defs>
//               <linearGradient id="gradient-line" x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="#00bc91" />
//                 <stop offset="50%" stopColor="#3b82f6" />
//                 <stop offset="100%" stopColor="#ec4899" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>

//         {/* محتوای استپ‌ها */}
//         <div className="space-y-24 md:space-y-48 relative z-10">
//           {steps.map((step, i) => (
//             <motion.div 
//               key={i}
//               initial={{ opacity: 0, y: 100 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               viewport={{ once: false, margin: "-100px" }}
//               transition={{ duration: 0.8, delay: i * 0.1 }}
//               className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10`}
//             >
//               {/* بخش کارت */}
//               <div className="w-full lg:w-[45%]">
//                 <motion.div 
//                   whileHover={{ y: -10, rotateX: 5, rotateY: i % 2 === 0 ? 5 : -5 }}
//                   className="p-8 md:p-12 rounded-[3.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-md hover:border-[#00bc91]/50 transition-all duration-500 group relative"
//                 >
//                   <div className="text-[#00bc91] mb-6 p-4 bg-[#00bc91]/10 w-fit rounded-2xl group-hover:scale-125 group-hover:bg-[#00bc91] group-hover:text-black transition-all duration-500">
//                     {step.icon}
//                   </div>
//                   <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
//                   <p className="text-white/40 leading-relaxed text-lg">{step.desc}</p>
                  
//                   {/* شماره مرحله بزرگ در پس‌زمینه کارت */}
//                   <span className="absolute bottom-8 left-8 text-8xl font-black opacity-[0.02] italic group-hover:opacity-[0.05] transition-opacity">0{i+1}</span>
//                 </motion.div>
//               </div>

//               {/* نقطه اتصال مرکزی (فقط دسکتاپ) */}
//               <div className="hidden lg:flex w-[10%] justify-center relative">
//                 <motion.div 
//                   initial={{ scale: 0 }}
//                   whileInView={{ scale: 1 }}
//                   viewport={{ once: false }}
//                   className="w-8 h-8 rounded-full bg-[#0a0a0a] border-4 border-[#00bc91] shadow-[0_0_20px_#00bc91] z-30"
//                 />
//                 {/* هاله نورانی دور نقطه */}
//                 <motion.div 
//                   animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                   className="absolute w-12 h-12 bg-[#00bc91]/20 rounded-full blur-xl"
//                 />
//               </div>

//               <div className="hidden lg:block lg:w-[45%]" />
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* افکت نوری پس‌زمینه کل بخش */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00bc91]/5 rounded-full blur-[120px] pointer-events-none" />
//     </section>
//   );
// }










// "use client"
// import React, { useRef } from 'react';
// import { motion, useScroll, useSpring } from 'framer-motion';
// import { Search, PenTool, Database, Code2, ShieldCheck, Rocket, Zap } from 'lucide-react';

// const steps = [
//   { title: "تحلیل نیازمندی‌ها", desc: "بررسی معماری دیتابیس (Schema Design) و مستندسازی APIها پیش از شروع کدنویسی.", icon: <Search />, color: "#00bc91" },
//   { title: "طراحی تجربه کاربری", desc: "خلق Prototype‌های تعاملی در Figma با رعایت اصول روانشناسی رنگ و دسترسی‌پذیری.", icon: <PenTool />, color: "#3b82f6" },
//   { title: "توسعه Backend", desc: "پیاده‌سازی سرور با Node.js، مدیریت احراز هویت JWT و اتصال به MongoDB.", icon: <Database />, color: "#a855f7" },
//   { title: "توسعه Frontend", desc: "کدنویسی کلاینت با Next.js و مدیریت State با Redux یا TanStack Query.", icon: <Code2 />, color: "#60a5fa" },
//   { title: "تست و امنیت", desc: "تست واحد، ایمن‌سازی در برابر حملات و بهینه‌سازی سرعت لود (Core Web Vitals).", icon: <ShieldCheck />, color: "#fbbf24" },
//   { title: "استقرار و پرتاب", desc: "دیپلوی روی سرورهای ابری و مانیتورینگ دائمی برای تضمین پایداری پروژه.", icon: <Rocket />, color: "#ec4899" },
// ];

// export default function ProcessTimeline() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     // بهینه‌سازی آفست برای دقت بیشتر در حرکت خط
//     offset: ["start center", "end center"]
//   });

//   const pathLength = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

//   return (
//     <section ref={containerRef} className="py-24 px-6 relative max-w-6xl mx-auto overflow-hidden">
//       <div className="text-center mb-28 relative">
//           <motion.h2 
//             initial={{ opacity: 0 }} 
//             whileInView={{ opacity: 0.03 }} 
//             className="text-8xl md:text-[10rem] font-black absolute inset-0 -top-16 select-none"
//           >
//             STRATEGY
//           </motion.h2>
//           <h3 className="text-4xl md:text-5xl font-black relative z-10">نقشه <span className="text-[#00bc91]">استراتژیک</span> پروژه</h3>
//       </div>
      
//       <div className="relative">
//         {/* گوی شروع - Z-index بالا برای ماندن روی همه چیز */}
//         <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 hidden lg:block">
//             <motion.div 
//                 animate={{ 
//                     boxShadow: ["0 0 10px #00bc91", "0 0 30px #00bc91", "0 0 10px #00bc91"],
//                     scale: [0.9, 1.1, 0.9]
//                 }}
//                 transition={{ repeat: Infinity, duration: 3 }}
//                 className="w-10 h-10 bg-[#0a0a0a] border-2 border-[#00bc91] rounded-full flex items-center justify-center text-[#00bc91]"
//             >
//                 <Zap size={18} fill="#00bc91" />
//             </motion.div>
//             <div className="w-[2px] h-12 bg-gradient-to-b from-[#00bc91] to-transparent mx-auto" />
//         </div>

//         {/* مسیر منحنی SVG - Z-index پایین برای رفتن زیر کارت‌ها */}
//         <div className="absolute inset-0 hidden lg:block pointer-events-none z-10" aria-hidden="true">
//           <svg width="100%" height="100%" viewBox="0 0 400 1000" fill="none" preserveAspectRatio="none">
//             <path 
//               d="M200 0 C200 80, 350 120, 350 250 C350 380, 50 380, 50 500 C50 620, 350 620, 350 750 C350 880, 200 920, 200 1000" 
//               stroke="url(#back-grad)" 
//               strokeWidth="2" 
//             />
//             <motion.path 
//               d="M200 0 C200 80, 350 120, 350 250 C350 380, 50 380, 50 500 C50 620, 350 620, 350 750 C350 880, 200 920, 200 1000" 
//               stroke="url(#main-grad)" 
//               strokeWidth="4" 
//               strokeLinecap="round"
//               style={{ pathLength }}
//             />
//             <defs>
//               <linearGradient id="back-grad" x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="transparent" />
//                 <stop offset="5%" stopColor="rgba(255,255,255,0.05)" />
//                 <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
//               </linearGradient>
//               <linearGradient id="main-grad" x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="#00bc91" />
//                 <stop offset="100%" stopColor="#3b82f6" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>

//         {/* محتوا با Z-index بالاتر از خط */}
//         <div className="space-y-24 relative z-20 pt-12">
//           {steps.map((step, i) => (
//             <motion.div 
//               key={i}
//               initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: false, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//               className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
//             >
//               <div className="w-full lg:w-[46%]">
//                 <motion.div 
//                   whileHover={{ y: -8, scale: 1.01 }}
//                   className="p-10 rounded-[2.5rem] bg-[#0d0d0d]/90 backdrop-blur-md border border-white/10 hover:border-[#00bc91]/40 transition-all duration-500 group relative shadow-2xl"
//                 >
//                   <div className="text-[#00bc91] mb-5 p-3 bg-[#00bc91]/10 w-fit rounded-xl group-hover:bg-[#00bc91] group-hover:text-black transition-all">
//                     {step.icon}
//                   </div>
//                   <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
//                   <p className="text-white/40 leading-relaxed font-light">{step.desc}</p>
//                   <span className="absolute top-8 left-8 text-5xl font-black opacity-[0.03] italic">0{i+1}</span>
//                 </motion.div>
//               </div>

//               {/* دایره‌های میانی هم سطح با کارت‌ها (Z-index 30) */}
//               <div className="hidden lg:flex w-[8%] justify-center relative z-30">
//                 <motion.div 
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                   className="w-6 h-6 rounded-full bg-[#0a0a0a] border-[3px] border-[#00bc91] shadow-[0_0_15px_#00bc91]"
//                 />
//               </div>

//               <div className="hidden lg:block lg:w-[46%]" />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, PenTool, Database, Code2, ShieldCheck, Rocket, Zap } from 'lucide-react';

const steps = [
  { title: "تحلیل نیازمندی‌ها", desc: "بررسی معماری دیتابیس (Schema Design) و مستندسازی APIها پیش از شروع کدنویسی.", icon: <Search /> },
  { title: "طراحی تجربه کاربری", desc: "خلق Prototype‌های تعاملی در Figma با رعایت اصول روانشناسی رنگ و دسترسی‌پذیری.", icon: <PenTool /> },
  { title: "توسعه Backend", desc: "پیاده‌سازی سرور با Node.js، مدیریت احراز هویت JWT و اتصال به MongoDB.", icon: <Database /> },
  { title: "توسعه Frontend", desc: "کدنویسی کلاینت با Next.js و مدیریت State با Redux یا TanStack Query.", icon: <Code2 /> },
  { title: "تست و امنیت", desc: "تست واحد، ایمن‌سازی در برابر حملات و بهینه‌سازی سرعت لود (Core Web Vitals).", icon: <ShieldCheck /> },
  { title: "استقرار و پرتاب", desc: "دیپلوی روی سرورهای ابری و مانیتورینگ دائمی برای تضمین پایداری پروژه.", icon: <Rocket /> },
];

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-background2"
    >

        <div className='py-24 px-6 relative max-w-6xl mx-auto overflow-hidden bg-background2 text-text-main'>


      {/* هدر بخش */}
      <div className="text-center mb-28 relative">
    
          <h3 className="text-4xl md:text-5xl font-black relative z-10">
            نقشه <span className="text-primary-accent">استراتژیک</span> پروژه
          </h3>
      </div>
      
      <div className="relative">
        {/* گوی شروع خط */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 hidden lg:block">
            <motion.div 
                animate={{ 
                    boxShadow: ["0 0 10px #00bc91", "0 0 30px #00bc91", "0 0 10px #00bc91"],
                    scale: [0.9, 1.1, 0.9]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-10 h-10 bg-background border-2 border-primary-accent rounded-full flex items-center justify-center text-primary-accent"
            >
                <Zap size={18} fill="currentColor" />
            </motion.div>
            <div className="w-[2px] h-12 bg-gradient-to-b from-primary-accent to-transparent mx-auto" />
        </div>

        {/* مسیر منحنی SVG */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none z-10" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 400 1000" fill="none" preserveAspectRatio="none">
            <path 
              d="M200 0 C200 80, 350 120, 350 250 C350 380, 50 380, 50 500 C50 620, 350 620, 350 750 C350 880, 200 920, 200 1000" 
              className="stroke-border"
              strokeWidth="2" 
            />
            <motion.path 
              d="M200 0 C200 80, 350 120, 350 250 C350 380, 50 380, 50 500 C50 620, 350 620, 350 750 C350 880, 200 920, 200 1000" 
              stroke="url(#main-grad)" 
              strokeWidth="4" 
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="main-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00bc91" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* محتوای استپ‌ها */}
        <div className="space-y-24 relative z-20 pt-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
            >
              <div className="w-full lg:w-[46%]">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="p-10 rounded-[2.5rem] bg-surface border border-border hover:border-primary-accent/40 transition-all duration-500 group relative shadow-2xl overflow-hidden"
                >
                  <div className="text-primary-accent mb-5 p-3 bg-primary-accent/10 w-fit rounded-xl group-hover:bg-primary-accent group-hover:text-background transition-all">
                    {step.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
                  <p className="text-text-faded leading-relaxed font-light">{step.desc}</p>
                  <span className="absolute top-8 left-8 text-5xl font-black text-text-muted italic">0{i+1}</span>
                </motion.div>
              </div>

              {/* نقطه مرکزی اتصال */}
              <div className="hidden lg:flex w-[8%] justify-center relative z-30">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-6 h-6 rounded-full bg-background border-[3px] border-primary-accent shadow-[0_0_15px_rgba(0,188,145,0.4)]"
                />
              </div>

              <div className="hidden lg:block lg:w-[46%]" />
            </motion.div>
          ))}
        </div>
      </div>
        </div>
    </section>
  );
}













// "use client"
// import React, { useRef } from 'react';
// import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
// import { Search, PenTool, Database, Code2, ShieldCheck, Rocket, Zap } from 'lucide-react';

// const steps = [
//   { title: "تحلیل نیازمندی‌ها", desc: "طراحی معماری دیتابیس و مستندسازی APIها.", icon: <Search />, color: "#00bc91" },
//   { title: "طراحی تجربه کاربری", desc: "خلق Prototype‌های تعاملی در Figma.", icon: <PenTool />, color: "#3b82f6" },
//   { title: "توسعه Backend", desc: "Node.js و MongoDB با امنیت JWT.", icon: <Database />, color: "#a855f7" },
//   { title: "توسعه Frontend", desc: "Next.js و State Management حرفه‌ای.", icon: <Code2 />, color: "#60a5fa" },
//   { title: "تست و امنیت", desc: "تست واحد و بهینه‌سازی سرعت لود.", icon: <ShieldCheck />, color: "#fbbf24" },
//   { title: "استقرار و پرتاب", desc: "دیپلوی روی سرورهای ابری و مانیتورینگ.", icon: <Rocket />, color: "#ec4899" },
// ];

// export default function ProcessTimeline() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start center", "end center"]
//   });

//   // تبدیل اسکرول به پوزیشن برای "پرتو لیزر"
//   const beamY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
//     stiffness: 100,
//     damping: 30
//   });

//   return (
//     <section ref={containerRef} className="py-24 px-6 relative max-w-6xl mx-auto bg-[#050505] text-white overflow-hidden">
//       <div className="text-center mb-32">
//           <h3 className="text-4xl md:text-6xl font-black tracking-tighter">
//             PROCESS <span className="text-[#00bc91] inline-block hover:skew-x-12 transition-transform">MAP</span>
//           </h3>
//       </div>
      
//       <div className="relative">
//         {/* ستون فقرات تایم‌لاین (خط مرکزی مدرن) */}
//         <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] hidden lg:block">
//             {/* خط پس‌زمینه خاموش */}
//             <div className="absolute inset-0 bg-white/5" />
            
//             {/* پرتو لیزر متحرک با اسکرول */}
//             <motion.div 
//                 style={{ top: 0, height: beamY }}
//                 className="absolute inset-x-0 bg-gradient-to-b from-transparent via-[#00bc91] to-[#3b82f6] shadow-[0_0_15px_#00bc91]"
//             />
            
//             {/* سرِ درخشان لیزر (The Head) */}
//             <motion.div 
//                 style={{ top: beamY }}
//                 className="absolute left-1/2 -translate-x-1/2 w-4 h-20 bg-gradient-to-b from-[#00bc91] to-transparent blur-md opacity-70"
//             />
//         </div>

//         <div className="space-y-16 relative z-10">
//           {steps.map((step, i) => (
//             <motion.div 
//               key={i}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: false, margin: "-100px" }}
//               className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between`}
//             >
//               {/* کارت محتوا با استایل Glassmorphism فشرده */}
//               <div className="w-full lg:w-[42%]">
//                 <motion.div 
//                   whileHover={{ scale: 1.02, borderLeftColor: "#00bc91" }}
//                   className="p-8 rounded-2xl bg-[#0a0a0a] border-l-4 border-white/5 hover:bg-[#111] transition-all duration-300 relative overflow-hidden group"
//                 >
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="p-3 rounded-full bg-white/5 text-[#00bc91] group-hover:rotate-[360deg] transition-transform duration-700">
//                       {step.icon}
//                     </div>
//                     <h4 className="text-xl font-bold tracking-wide">{step.title}</h4>
//                   </div>
//                   <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  
//                   {/* نور پس‌زمینه کارت که با هاور روشن می‌شود */}
//                   <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 group-hover:animate-shine pointer-events-none" />
//                 </motion.div>
//               </div>

//               {/* گره مرکزی (Node) که با رسیدن لیزر روشن می‌شود */}
//               <div className="hidden lg:flex w-[16%] justify-center relative">
//                 <motion.div 
//                    className="w-4 h-4 rounded-full bg-black border-2 border-white/20 z-20 relative"
//                    whileInView={{ 
//                      borderColor: "#00bc91",
//                      boxShadow: "0 0 20px #00bc91",
//                      scale: 1.2
//                    }}
//                    transition={{ delay: 0.2 }}
//                 />
//                 {/* خط اتصال افقی کوچک بین کارت و مرکز */}
//                 <div className={`absolute top-1/2 -translate-y-1/2 h-[1px] bg-white/10 w-20 
//                     ${i % 2 === 0 ? 'right-1/2 mr-2' : 'left-1/2 ml-2'}`} 
//                 />
//               </div>

//               <div className="hidden lg:block lg:w-[42%]" />
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes shine {
//           100% { left: 200%; }
//         }
//         .animate-shine {
//           animation: shine 1.5s infinite;
//         }
//       `}</style>
//     </section>
//   );
// }