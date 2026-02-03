"use client";
import React from 'react';
import Marquee from "react-fast-marquee";

/**
 * دانیال عزیز، برای اجرای این نسخه حتماً باید کتابخانه را نصب کنی:
 * دستور در ترمینال: npm install react-fast-marquee
 */

const InfiniteMarquee = ({ direction = "left", speed = 25 }) => {
  const technologies = [
    { name: 'React', icon: '⚛️', color: 'text-cyan-400' },
    { name: 'JavaScript', icon: '🟨', color: 'text-yellow-400' },
    { name: 'Node.js', icon: '💚', color: 'text-green-500' },
    { name: 'MongoDB', icon: '🍃', color: 'text-green-400' },
    { name: 'Next.js', icon: '⚫', color: 'text-white' },
    { name: 'Tailwind', icon: '🌊', color: 'text-sky-400' },
    { name: 'TypeScript', icon: '🔷', color: 'text-blue-500' },
    { name: 'Express', icon: '🚀', color: 'text-gray-300' },
  ];

  return (
    <div className="w-full py-10 flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      <div className="relative w-full overflow-hidden">
        
        {/* لایه‌های محو کننده کناری (Gradients) */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

        {/* استفاده از کامپوننت Marquee کتابخانه */}
        <Marquee 
          direction={direction} 
          speed={speed} 
          pauseOnHover={true} 
          gradient={false} // چون خودمان گرادینت سفارشی دادیم این را غیرفعال می‌کنیم
        >
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 mx-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl"
            >
              <span className="text-3xl md:text-4xl">{tech.icon}</span>
              <span className={`text-lg md:text-xl font-bold tracking-tight ${tech.color}`}>{tech.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default InfiniteMarquee;