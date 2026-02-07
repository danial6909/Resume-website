"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="py-32 px-6">
      <motion.div 
          whileHover={{ scale: 0.99 }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-[#111] to-[#0a0a0a] p-16 md:p-28 rounded-[4rem] border border-white/5 relative overflow-hidden text-center"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00bc91]/10 rounded-full blur-[100px] -z-0" />
        <h2 className="text-4xl md:text-7xl font-black mb-10 leading-none">فراتر از یک کدنویسی ساده...</h2>
        <p className="text-white/40 mb-14 text-lg md:text-xl font-light">ما همراه شما هستیم تا بیزینس‌تان را در دنیای دیجیتال به پرواز درآوریم.</p>
        <button className="group bg-white text-black px-14 py-6 rounded-[2rem] font-black text-xl hover:bg-[#00bc91] transition-all duration-500 flex items-center gap-4 mx-auto shadow-2xl">
          رزرو وقت مشاوره <ArrowRight size={24} className="group-hover:translate-x-[-8px] transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}