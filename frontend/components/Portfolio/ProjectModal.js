// components/Portfolio/ProjectModal.jsx
"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl bg-[#111112] border border-border rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 left-5 z-[110] bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20"
        >
          ✕
        </button>

        <div className="w-full md:w-3/5 h-[300px] md:h-auto bg-black">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 4000 }}
            className="h-full w-full inner-project-swiper"
          >
            {(project.images || [project.image]).map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} className="w-full h-full object-contain md:object-cover" alt={project.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col" dir="rtl">
          <div className="mb-6">
            <span className="bg-primary-accent/10 text-primary-accent px-3 py-1 rounded-lg text-xs font-bold border border-primary-accent/20">
              {project.category}
            </span>
            <h2 className="text-3xl font-black mt-4 text-white">{project.title}</h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">{project.desc}</p>
            <h4 className="text-white font-bold text-sm mb-3">تکنولوژی‌ها:</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {(project.techs || ["React", "Next.js"]).map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[11px] text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <a href={project.link || "#"} className="flex-1 bg-primary-accent text-background text-center font-black py-3.5 rounded-2xl hover:scale-[1.02] transition-all text-sm">
              مشاهده وب‌سایت
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;