// src/hooks/useScroll.js
"use client"

import { useState, useEffect } from 'react';

export const useScroll = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // اضافه کردن event listener
    window.addEventListener('scroll', handleScroll);

    // پاک کردن event listener هنگام unmount شدن کامپوننت
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]); // فقط یک بار بعد از رندر اولیه اجرا می‌شود

  return scrolled;
};
