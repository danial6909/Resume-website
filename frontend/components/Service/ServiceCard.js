"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const ServiceCard = ({ icon, title, description, slug }) => {
  // تعریف رفتار هر کارت به صورت واریانت
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1] // یک ease خروجی بسیار نرم (مثل اپل)
      }
    }
  };

  return (
    <motion.div
      dir="rtl"
      variants={cardVariants}
      // در اینجا initial و whileInView نمی‌گذاریم چون پدر کنترلش می‌کند
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative p-px border-2 border-border font-[vazir] overflow-hidden group rounded-sm transition-colors duration-500 hover:border-[#00bc91]"
    >
      <div className="relative flex flex-col justify-between h-72 w-full max-sm:max-w-full max-w-sm p-6 bg-background backdrop-blur-xl rounded-[10px] z-10 transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-[#00bc91]/10">
        
        <div>
          <div className="grid place-items-center w-12 h-12 bg-[#00bc91] text-white text-3xl rounded-lg shadow-lg shadow-[#00bc91]/20 transition-transform duration-500 group-hover:scale-110 ">
            {icon}
          </div>

          <h2 className="text-xl text-right font-bold text-text-main mt-4 transition-colors duration-300 group-hover:text-[#00bc91]">
            {title}
          </h2>

          <p className="text-base text-text-faded leading-relaxed text-right mt-2 line-clamp-3 font-medium">
            {description}
          </p>
        </div>

        <Link
          href={`/services/${slug}`}
          className="flex items-center gap-2 text-[#00bc91] font-black group/link w-fit text-base md:text-lg tracking-tight"
        >
          <span className="border-b-2 border-transparent  transition-all duration-300">
            مشاهده جزئیات
          </span>
          <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover/link:-translate-x-2" />
        </Link>
      </div>

      {/* افکت نور hover */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <div className="absolute inset-0 translate-x-[-120%] translate-y-[-120%] group-hover:translate-x-[120%] group-hover:translate-y-[120%] transition-transform duration-1000 ease-in-out">
          <div className="absolute inset-[-20%] rotate-[15deg] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;