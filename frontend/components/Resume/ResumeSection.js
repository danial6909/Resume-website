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
      email: "wolfdan1382@gmail.com",
      phone: "+98-938-154-3140",
      location: "ایران، مشهد",
      experience: "2+ سال",
      freelance: "در دسترس",
      bio: " 22 ساله و دانشجوی مهندسی کامپیوتر. یک سال است که مسیر فرانت‌اِند را با یادگیری HTML، CSS و JS شروع کرده‌ام و اکنون در حال عمیق شدن در React هستم. هدف نهایی من تبدیل شدن به یک MERN Stack حرفه‌ای است.",
      skills: [
        { name: "HTML5 / CSS3", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React.js", level: 80 },
        { name: "Next.js", level: 75 },
        { name: "Git / Github", level: 70 },
        { name: "Restful API", level: 85 },
        { name: "TypeScript", level: 40 },
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
      experience: "1+ سال",
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
