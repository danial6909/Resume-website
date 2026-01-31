"use client"
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} 
from "../components/Resume/animations";


export default function TitleHeaderPages({title1,title2}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      
    >
      <div className="relative">
        {/* عدد بزرگ محو در پس‌زمینه (مثلا 01 یا Resume) */}
        <span className="  absolute -top-8 -right-4 text-8xl font-black text-text-main/[0.03] select-none font-sans">
          {title1}
        </span>

        <div className="relative z-10 space-y-2">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black leading-none"
          >
            <span className="block text-text-main">{title2}</span>
            <span
              className="block text-transparent bg-clip-text border-text-main"
              style={{ WebkitTextStroke: `1px rgba(255,255,255,0.2)` }}
            >
              تیم ما
            </span>
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
}
