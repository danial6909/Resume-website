"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const ServiceCard = ({ icon, title, description, readMore }) => {
    return (
        <motion.div
            dir="rtl"
            // استفاده از کلاس‌های Tailwind برای مدیریت بردر و تم
            className="relative p-px border-2 border-border font-sans overflow-hidden group rounded-xl transition-all duration-500 hover:border-[#00bc91]" 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{ scale: 1.02 }}
        >
            {/* محتوای اصلی کارت */}
            <div className="relative flex flex-col justify-between h-72 w-full max-w-sm p-6 bg-background backdrop-blur-xl rounded-[10px] z-10">
                <div>
                    <div className="grid place-items-center w-12 h-12 bg-[#00bc91] text-white text-3xl rounded-lg">
                        {icon}
                    </div>
                    
                    <h2 className="text-xl text-right font-bold text-text-main mt-4">
                        {title}
                    </h2>
                    
                    <p className="text-base text-text-faded leading-relaxed text-right mt-2">
                        {description}
                    </p>
                </div>
                
                <div className="flex items-center gap-1 text-[#00bc91] font-semibold cursor-pointer group/link">
                    {readMore}
                    <ArrowLeft className="w-5 h-5 mt-1 transition-transform duration-300 group-hover/link:-translate-x-1.5"/>
                </div>
            </div>

            {/* همان افکت آیینه ای ظریف خودت (Light Version) */}
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-[100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out">
                    {/* تنظیم شده روی opacity-10 و blur-md برای ملایم بودن */}
                    <div className="absolute inset-[-20%] rotate-[15deg] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md" />
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;