// src/context/ThemeContext.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// ۱. ایجاد Context
const ThemeContext = createContext();

// ۲. هوک سفارشی برای استفاده آسان
export const useTheme = () => useContext(ThemeContext);

// ۳. Provider (Client Component)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false); // برای تضمین اجرای بعد از Hydration

  // الف. خواندن Local Storage و تنظیم حالت اولیه
  useEffect(() => {
    // این کد فقط در کلاینت اجرا می‌شود
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // اگر تم ذخیره شده یا ترجیح سیستم وجود دارد، آن را اعمال کن
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  // ب. اعمال کلاس 'dark' روی تگ <html>
  useEffect(() => {
    if (!mounted) return; // تا زمانی که کامپوننت mount نشده، اعمال نکن
    
    const html = document.documentElement;
    html.classList.remove('light', 'dark'); // ابتدا حالت‌های قبلی را حذف کن
    html.classList.add(theme); // حالت جدید را اضافه کن
    
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);


  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}