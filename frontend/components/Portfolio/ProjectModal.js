"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    // جلوگیری از اسکرول صفحه زیر مودال
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 font-[vazir]">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl bg-background2 border border-border rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 z-[110] bg-surface hover:bg-primary-accent text-text-main w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-border group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* بخش تصاویر (Swiper) */}
        <div className="w-full md:w-3/5 h-[300px] md:h-auto bg-background relative">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 4000 }}
            className="h-full w-full inner-project-swiper"
          >
            {(project.images || [project.image]).map((img, index) => (
              <SwiperSlide key={index} className="relative w-full h-full">
                <Image
                  src={img}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain md:object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* بخش محتوا (RTL) */}
        <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col bg-background2" dir="rtl">
          <div className="mb-6">
            <span className="bg-primary-accent/10 text-primary-accent px-3 py-1 rounded-lg text-xs font-bold border border-primary-accent/20">
              {project.category}
            </span>
            <h2 className="text-3xl font-black mt-4 text-text-main tracking-tight">
              {project.title}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <p className="text-text-faded leading-relaxed mb-6 text-sm md:text-base">
              {project.desc}
            </p>
            
            <h4 className="text-text-main font-bold text-sm mb-3">تکنولوژی‌ها:</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {(project.techs || ["React", "Next.js"]).map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 bg-surface border border-border rounded-xl text-[11px] text-text-faded hover:border-primary-accent/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <a 
              href={project.link || "#"} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary-accent text-background font-black py-4 rounded-2xl hover:opacity-90 transition-all text-sm shadow-lg shadow-primary-accent/20"
            >
              مشاهده وب‌سایت
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;