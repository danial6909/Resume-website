"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // روی 400 گذاشتم که زودتر ببینی تست کنی
      if (window.scrollY > 800) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-10 right-10 z-[1000]">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            // انیمیشن ورود: قل خوردن از راست
            initial={{ opacity: 0, x: 100, rotate: -180 }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
              y: [0, -10, 0], // انیمیشن شناور بودن دائمی
            }}
            exit={{ opacity: 0, x: 100, rotate: 180 }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              default: { duration: 0.5 },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center  cursor-pointer justify-center w-13 h-13 rounded-2xl shadow-[0_0_10px_rgba(0,188,145,0.3)]"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {/* هاله نوری پشت دکمه برای زیبایی بیشتر */}
            <div
              className="absolute inset-0 rounded-2xl blur-md opacity-20 -z-10"
              style={{ backgroundColor: "var(--primary-accent)" }}
            />

            {/* آیکون فلش با رنگ اصلی تم تو */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="#00bc91"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>

            {/* یک خط تزئینی کوچک پایین دکمه */}
            <div
              className="absolute bottom-2 w-4 h-[2px] rounded-full"
              style={{ backgroundColor: "var(--primary-accent)" }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollToTop;
