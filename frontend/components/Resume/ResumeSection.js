// import Image from "next/image";

// import profileImg from "@/public/background/back.jpg"; // مسیر عکس خودت را بگذار

// export default function AboutSection() {
//   const info = [
//     { label: "نام", value: "دانیال ..." },
//     { label: "ایمیل", value: "email@domain.com" },
//     { label: "تولد", value: "15 ژانویه 1998" },
//     { label: "تلفن", value: "+98-912-345-6789" },
//     { label: "آدرس", value: "ایران، تهران" },
//     { label: "فریلنس", value: "در دسترس" },
//     { label: "تجربه", value: "1+ سال" },
//   ];

//   const stats = [
//     { number: "90+", label: "پروژه انجام شده" },
//     { number: "50+", label: "مشتری راضی" },
//     { number: "7+", label: "جوایز کسب شده" },
//     { number: "20k", label: "خط کد زنی" },
//   ];

//   return (
//     <section className="bg-background text-text-main py-20 px-4 md:px-10 font-[vazir,system-ui]" dir="rtl">
//       <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

//         {/* بخش تصویر */}
//         <div className="relative w-full aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-lg">
//           <Image
//             src={profileImg}
//             alt="Andrew Taylor"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>

//         {/* بخش محتوا */}
//         <div className="flex flex-col space-y-6">
//           <h2 className="text-3xl font-bold">
//             سلام! من <span className="text-primary-accent">دانیال هستم</span>
//           </h2>

//           <p className="text-text-faded leading-7 text-justify">
//             لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
//           </p>

//           {/* جدول اطلاعات */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-b border-border pb-8">
//             {info.map((item, index) => (
//               <div key={index} className="flex items-center space-x-2 space-x-reverse">
//                 <span className="text-text-main font-semibold min-w-[70px]">{item.label}</span>
//                 <span className="text-text-muted px-2">:</span>
//                 <span className="text-text-faded">{item.value}</span>
//               </div>
//             ))}
//           </div>

//           {/* آمار و ارقام */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
//             {stats.map((stat, index) => (
//               <div key={index} className="flex flex-col">
//                 <span className="text-primary-accent text-3xl font-bold">{stat.number}</span>
//                 <span className="text-text-muted text-sm mt-1">{stat.label}</span>
//               </div>
//             ))}
//           </div>

//           {/* دکمه دانلود */}
//           <div className="pt-6">
//             <button className="flex items-center gap-2 border-2 border-primary-accent text-primary-accent px-6 py-2.5 rounded-md hover:bg-primary-accent hover:text-background transition-all duration-300 font-bold group">
//               <span>دانلود رزومه</span>

//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import Image from "next/image";

// import { motion } from "framer-motion";

// export default function AboutSection() {
//   // تنظیمات انیمیشن برای ظهور المان‌ها
//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//   };

//   const team = [
//     {
//       name: "دانیال",
//       role: "Front-end Developer",
//       image: "/logo/logo.jpg",
//       bio: "یک سال است که یادگیری فرانت‌اِند را شروع کرده‌ام. مسلط به HTML، CSS و JS هستم و در حال حاضر روی React و Next.js تمرکز دارم تا به یک MERN Stack تبدیل شوم.",
//     },
//     {
//       name: "همکار شما",
//       role: "Back-end Developer",
//       image: "/logo/logo.jpg",
//       bio: "متخصص طراحی دیتابیس و معماری سرور. علاقمند به پیاده‌سازی سیستم‌های مقیاس‌پذیر و بهینه با استفاده از Node.js و MongoDB.",
//     },
//   ];

//   const skills = [
//     { name: "React / Next.js", percentage: 90, color: "var(--primary-accent)" },
//     { name: "JavaScript (ES6+)", percentage: 85, color: "var(--secondary-accent)" },
//     { name: "Tailwind CSS 4", percentage: 95, color: "var(--primary-accent)" },
//     { name: "Node.js / Express", percentage: 75, color: "var(--secondary-accent)" },
//     { name: "MongoDB", percentage: 70, color: "var(--primary-accent)" },
//     { name: "UI/UX Design", percentage: 80, color: "var(--secondary-accent)" },
//   ];

//   return (
//     <main className="bg-background text-text-main min-h-screen pb-20 overflow-x-hidden" dir="rtl">

//       {/* هدر با انیمیشن ورود */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn}
//         className="py-20 text-center container mx-auto px-4"
//       >
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">
//           درباره <span className="text-primary-accent">ما</span>
//         </h1>
//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: "6rem" }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="h-1.5 bg-secondary-accent mx-auto rounded-full"
//         ></motion.div>
//         <p className="text-text-faded mt-6 max-w-2xl mx-auto leading-relaxed">
//           ما یک تیم دونفره پویا هستیم که با ترکیب هنر طراحی رابط کاربری و قدرت برنامه‌نویسی سمت سرور، ایده‌های شما را به واقعیت تبدیل می‌کنیم.
//         </p>
//       </motion.section>

//       {/* بخش اعضای تیم با حالت Stagger (یکی یکی ظاهر شدن) */}
//       <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
//         {team.map((member, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: index === 0 ? 50 : -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: index * 0.2 }}
//             className="bg-surface border border-border p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 hover:border-primary-accent transition-colors duration-500"
//           >
//             <div className="relative w-40 h-40 shrink-0 border-4 border-background rounded-2xl overflow-hidden shadow-xl">
//               <Image src={member.image} alt={member.name} fill className="object-cover" />
//             </div>
//             <div className="text-center md:text-right space-y-3">
//               <h3 className="text-2xl font-bold">{member.name}</h3>
//               <p className="text-primary-accent font-medium text-sm">{member.role}</p>
//               <p className="text-text-faded text-sm leading-relaxed">{member.bio}</p>
//               <div className="flex justify-center md:justify-start gap-4 pt-2">

//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </section>

//       {/* بخش مهارت‌ها با انیمیشن پر شدن نوارها هنگام اسکرول */}
//       <section className="container mx-auto px-4 mb-24">
//         <div className="bg-surface/30 border border-border rounded-[2.5rem] p-8 md:p-16">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
//             {skills.map((skill, index) => (
//               <div key={index} className="space-y-3">
//                 <div className="flex justify-between text-sm font-bold">
//                   <span>{skill.name}</span>
//                   <motion.span
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                   >
//                     {skill.percentage}%
//                   </motion.span>
//                 </div>
//                 <div className="h-3 w-full bg-background rounded-full border border-border overflow-hidden p-[2px]">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     whileInView={{ width: `${skill.percentage}%` }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
//                     className="h-full rounded-full"
//                     style={{
//                       backgroundColor: skill.color,
//                       boxShadow: `0 0 15px ${skill.color}66`
//                     }}
//                   ></motion.div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* بخش آمار (Stats) */}
//       <section className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
//         {[
//           { n: "90+", l: "پروژه" }, { n: "50+", l: "مشتری" },
//           { n: "7+", l: "جوایز" }, { n: "20k", l: "خط کد" }
//         ].map((stat, i) => (
//           <motion.div
//             key={i}
//             initial={{ scale: 0.8, opacity: 0 }}
//             whileInView={{ scale: 1, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: i * 0.1 }}
//             className="text-center p-8 bg-surface border border-border rounded-2xl"
//           >
//             <div className="text-4xl font-black text-primary-accent mb-2">{stat.n}</div>
//             <div className="text-text-muted text-sm">{stat.l}</div>
//           </motion.div>
//         ))}
//       </section>

//       {/* دکمه CTA با انیمیشن شناور */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         className="mt-24 text-center"
//       >
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-primary-accent text-background px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary-accent/20 flex items-center gap-3 mx-auto"
//         >
//           شروع پروژه جدید

//         </motion.button>
//       </motion.div>
//     </main>
//   );
// }

// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// // وارد کردن آیکون‌های Lucide
// import {
//   Github,
//   Linkedin,
//   ExternalLink,
//   Code2,
//   Layers,
//   User2,
//   Download
// } from "lucide-react";

// export default function AboutPage() {
//   const fadeIn = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
//   };

//   const team = [
//     {
//       name: "دانیال",
//       role: "Front-end Developer",
//       image: "/logo/logo.jpg",
//       bio: "یک سال است که یادگیری فرانت‌اِند را شروع کرده‌ام. مسلط به HTML، CSS و JS هستم و در حال حاضر روی React و Next.js تمرکز دارم تا به یک MERN Stack تبدیل شوم.",
//     },
//     {
//       name: "همکار شما",
//       role: "Back-end Developer",
//       image: "/logo/logo.jpg",
//       bio: "متخصص طراحی دیتابیس و معماری سرور. علاقمند به پیاده‌سازی سیستم‌های مقیاس‌پذیر و بهینه با استفاده از Node.js و MongoDB.",
//     },
//   ];

//   const skills = [
//     { name: "React / Next.js", percentage: 90, color: "var(--primary-accent)" },
//     { name: "JavaScript (ES6+)", percentage: 85, color: "var(--secondary-accent)" },
//     { name: "Tailwind CSS 4", percentage: 95, color: "var(--primary-accent)" },
//     { name: "Node.js / Express", percentage: 75, color: "var(--secondary-accent)" },
//     { name: "MongoDB", percentage: 70, color: "var(--primary-accent)" },
//     { name: "UI/UX Design", percentage: 80, color: "var(--secondary-accent)" },
//   ];

//   return (
//     <main className="bg-background text-text-main min-h-screen pb-20 overflow-x-hidden" dir="rtl">

//       {/* هدر بخش درباره ما */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn}
//         className="py-24 text-center container mx-auto px-4"
//       >
//         <div className="inline-flex items-center justify-center p-3 bg-surface rounded-2xl mb-6 border border-border">
//           <User2 className="text-primary-accent" size={28} />
//         </div>
//         <h1 className="text-4xl md:text-5xl font-black mb-4">
//           داستان <span className="text-primary-accent">تیم ما</span>
//         </h1>
//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: "80px" }}
//           className="h-1.5 bg-secondary-accent mx-auto rounded-full"
//         />
//         <p className="text-text-faded mt-8 max-w-2xl mx-auto leading-relaxed text-lg">
//           ما دو توسعه‌دهنده مشتاق هستیم که با هدف خلق تجربه‌های دیجیتال متفاوت، تخصص‌هایمان را با هم ترکیب کرده‌ایم.
//         </p>
//       </motion.section>

//       {/* بخش کارت‌های اعضا */}
//       <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
//         {team.map((member, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: index === 0 ? 40 : -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: index * 0.2 }}
//             className="bg-surface/50 backdrop-blur-sm border border-border p-10 rounded-[2rem] flex flex-col items-center text-center md:flex-row md:text-right gap-10 hover:border-primary-accent/50 transition-all duration-500 group"
//           >
//             <div className="relative w-44 h-44 shrink-0 rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl">
//               <Image src={member.image} alt={member.name} fill className="object-cover" />
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-2xl font-bold">{member.name}</h3>
//                 <p className="text-primary-accent font-semibold text-sm mt-1 uppercase tracking-widest">{member.role}</p>
//               </div>
//               <p className="text-text-faded text-sm leading-relaxed italic">
//                 "{member.bio}"
//               </p>
//               <div className="flex justify-center md:justify-start gap-5 pt-4">
//                 <a href="#" className="p-2 bg-background rounded-xl hover:text-primary-accent transition-colors border border-border">
//                   <Github size={20} />
//                 </a>
//                 <a href="#" className="p-2 bg-background rounded-xl hover:text-secondary-accent transition-colors border border-border">
//                   <Linkedin size={20} />
//                 </a>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </section>

//       {/* بخش مهارت‌ها با استایل Lucide */}
//       <section className="container mx-auto px-4 mb-32">
//         <div className="bg-surface border border-border rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
//           <div className="absolute top-0 left-0 p-10 opacity-5 pointer-events-none">
//             <Code2 size={200} />
//           </div>

//           <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-16">
//             <div className="lg:col-span-1">
//               <Layers className="text-secondary-accent mb-6" size={40} />
//               <h2 className="text-3xl font-bold mb-6 text-text-main">تخصص‌های <br/> فنی ما</h2>
//               <p className="text-text-muted leading-relaxed">
//                 ما از مدرن‌ترین ابزارها برای تضمین کیفیت و سرعت پروژه‌ها استفاده می‌کنیم. تمرکز اصلی ما روی اکوسیستم JavaScript است.
//               </p>
//             </div>

//             <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
//               {skills.map((skill, index) => (
//                 <div key={index} className="space-y-4">
//                   <div className="flex justify-between items-end">
//                     <span className="font-bold text-text-faded tracking-wide">{skill.name}</span>
//                     <span className="text-xs font-mono text-text-muted">{skill.percentage}%</span>
//                   </div>
//                   <div className="h-2 w-full bg-background rounded-full overflow-hidden">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       whileInView={{ width: `${skill.percentage}%` }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 1.5, ease: "circOut", delay: index * 0.1 }}
//                       className="h-full rounded-full relative"
//                       style={{ backgroundColor: skill.color }}
//                     >
//                       <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
//                     </motion.div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* بخش آمار و CTA نهایی */}
//       <section className="container mx-auto px-4 text-center">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
//           {[
//             { n: "90+", l: "پروژه", icon: <Code2 size={20}/> },
//             { n: "50+", l: "مشتری", icon: <User2 size={20}/> },
//             { n: "7+", l: "جوایز", icon: <Layers size={20}/> },
//             { n: "24/7", l: "پشتیبانی", icon: <ExternalLink size={20}/> }
//           ].map((stat, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -10 }}
//               className="p-8 bg-surface/30 border border-border rounded-3xl flex flex-col items-center gap-3"
//             >
//               <div className="text-text-muted mb-2">{stat.icon}</div>
//               <div className="text-3xl font-black text-primary-accent">{stat.n}</div>
//               <div className="text-xs text-text-muted font-bold uppercase tracking-widest">{stat.l}</div>
//             </motion.div>
//           ))}
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 188, 145, 0.2)" }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-primary-accent text-background px-12 py-5 rounded-2xl font-bold text-lg flex items-center gap-4 mx-auto transition-all"
//         >
//           <span>مشاهده رزومه تیمی</span>
//           <Download size={20} />
//         </motion.button>
//       </section>
//     </main>
//   );
// }

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

// ایمپورت کامپوننت‌های ساخته شده
import SectionHeader from "./SectionHeader";
import PersonalDetails from "./PersonalDetails";
import SkillSection from "./SkillSection";
import StatsGrid from "./StatsGrid";
import AiAssistantCard from "./AiAssistantCard";
import ProfileVisual from "./ProfileVisual";
import { containerVariants, itemVariants } from "./animations";

export default function ResumeSection() {
  const [activeResume, setActiveResume] = useState("danial");
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const resumes = {
    danial: {
      name: "دانیال",
      image: "/logo/dani.jpg",
      role: "توسعه‌دهنده Front-end",
      email: "danial@domain.com",
      phone: "+98-912-345-6789",
      location: "ایران، تهران",
      experience: "2+ سال",
      freelance: "در دسترس",
      bio: " ۲۱ ساله و دانشجوی مهندسی کامپیوتر. یک سال است که مسیر فرانت‌اِند را با یادگیری HTML، CSS و JS شروع کرده‌ام و اکنون در حال عمیق شدن در React هستم. هدف نهایی من تبدیل شدن به یک MERN Stack حرفه‌ای است.",
      skills: [
        { name: "React.js", level: 75 },
        { name: "JavaScript", level: 85 },
        { name: "HTML5 / CSS3", level: 95 },
        { name: "Tailwind CSS", level: 90 },
      ],
      stats: [
        { number: "90+", label: "پروژه انجام شده" },
        { number: "50+", label: "مشتری راضی" },
        { number: "7+", label: "جوایز کسب شده" },
        { number: "20k", label: "خط کد زنی" },
      ],
      color: "var(--primary-accent)",
      

    },
    partner: {
      name: "علی",
      image: "/logo/ali.jpg",
      role: "توسعه‌دهنده Back-end",
      email: "partner@domain.com",
      phone: "+98-935-123-4567",
      location: "ایران، شیراز",
      experience: "۲+ سال",
      freelance: "در دسترس",
      bio: "متخصص طراحی دیتابیس و مدیریت سرور. تمرکز من بر امنیت، سرعت و بهینه‌سازی APIها با استفاده از Django و SQL است تا زیرساختی پایدار برای پروژه‌ها ایجاد کنم.",
      skills: [
        { name: "Python / Django", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "Node.js", level: 70 },
        { name: "Restful API", level: 95 },
      ],
      stats: [
        { number: "40+", label: "پروژه سیستمی" },
        { number: "30+", label: "مشتری راضی" },
        { number: "5+", label: "جوایز فنی" },
        { number: "50k", label: "کد بک‌اِند" },
      ],
color: "var(--secondary-accent)",
    },
  };

  const current = resumes[activeResume];

  const generateCareerAdvice = async () => {
    setIsAnalyzing(true);
    setAiAnalysis("");
    const prompt = `Based on this resume: Name: ${current.name}, Role: ${
      current.role
    }, Skills: ${current.skills
      .map((s) => s.name)
      .join(", ")}. Write 3 professional career advice sentences in Persian.`;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const data = await response.json();
      setAiAnalysis(data.candidates?.[0]?.content?.parts?.[0]?.text);
    } catch (e) {
      setAiAnalysis("خطا در دریافت مشاوره.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playVoiceIntroduction = async () => {
    setIsSpeaking(true);
    const textToSay = `سلام! من ${current.name} هستم، ${current.role}. ${current.bio}`;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: textToSay }] }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } },
              },
            },
          }),
        }
      );
      const data = await response.json();
      const pcmData =
        data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (pcmData) {
        const audioBlob = pcmToWav(pcmData, 24000);
        const audio = new Audio(URL.createObjectURL(audioBlob));
        audio.onended = () => setIsSpeaking(false);
        audio.play();
      }
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  const pcmToWav = (base64Pcm, sampleRate) => {
    const pcm = atob(base64Pcm);
    const buffer = new ArrayBuffer(44 + pcm.length);
    const view = new DataView(buffer);
    const writeString = (o, s) => {
      for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i));
    };
    writeString(0, "RIFF");
    view.setUint32(4, 32 + pcm.length, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, pcm.length, true);
    for (let i = 0; i < pcm.length; i++)
      view.setUint8(44 + i, pcm.charCodeAt(i));
    return new Blob([buffer], { type: "audio/wav" });
  };

  return (
    <section
      className="bg-background text-text-main py-10 px-6 md:px-12 lg:px-20 font-sans selection:bg-primary-accent/40 "
      dir="rtl"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeader
          activeResume={activeResume}
          setActiveResume={setActiveResume}
          setAiAnalysis={setAiAnalysis}
          current={current}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeResume}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            <div className="flex flex-col space-y-8 order-2 lg:order-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.h3
                  variants={itemVariants}
                  className="text-3xl md:text-4xl font-black leading-tight"
                >
                  سلام! من{" "}
                  <span style={{ color: current.color }}>
                    {current.name} هستم
                  </span>
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-text-faded text-lg leading-8 text-justify"
                >
                  {current.bio}
                </motion.p>
              </motion.div>

              <PersonalDetails current={current} />

              <SkillSection current={current} />

              <StatsGrid stats={current.stats} color={current.color} />

              <AiAssistantCard
                aiAnalysis={aiAnalysis}
                isAnalyzing={isAnalyzing}
                onGenerate={generateCareerAdvice}
              />

              <div className="pt-6">
                <button
                  className="flex items-center gap-2 border-2 px-6 py-2.5 rounded-md hover:bg-primary-accent hover:text-white transition-all duration-300 font-bold group"
                  style={{ borderColor: current.color, color: current.color }}
                >
                  <Download size={18} />
                  <span>دانلود رزومه</span>
                </button>
              </div>
            </div>

            <ProfileVisual
              current={current}
              isSpeaking={isSpeaking}
              onPlayVoice={playVoiceIntroduction}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
