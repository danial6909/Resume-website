// src/components/AnimatedTitle.jsx
"use client"
import React from 'react';

const AnimatedTitle = ({ title }) => {
  return (
    <>
      <div className="inline-block" dir="rtl">
        <h3 className={`
          title-heading /* یک کلاس سفارشی برای هدف‌گیری در استایل */
          relative          /* برای موقعیت‌دهی خطوط */
          pb-3              /* ایجاد فاصله برای خطوط در پایین */
          text-2xl          /* اندازه فونت */
          font-semibold     /* ضخامت فونت */
          uppercase         /* حروف بزرگ (برای انگلیسی) */
          text-primary-accent    /* رنگ متن */

          /* خط ثابت خاکستری (::before) */
          before:content-['']
          before:absolute
          before:bottom-0
          before:left-0
          before:w-full
          before:h-[3px]
          before:bg-border

          /* خط متحرک رنگی (::after) - بدون انیمیشن از Tailwind */
          after:content-['']
          after:absolute
          after:bottom-0
          after:left-0
          after:w-5          /* عرض خط متحرک (32px) */
          after:h-[3px]
          after:bg-primary-accent
        `}>
          {title}
        </h3>
      </div>

      {/* 
        استایل‌های JSX: این بخش CSS را فقط به همین کامپوننت اعمال می‌کند.
      */}
      <style jsx>{`
        @keyframes moveLine {
          from {
            left: 0%;
          }
          to {
            left: calc(100% - 20px); 
          }
        }

        /* 
          اعمال انیمیشن به شبه‌المان after در کلاس title-heading 
        */
        .title-heading::after {
          animation: moveLine 2.5s ease-in-out infinite alternate;
        }
      `}</style>
    </>
  );
};

export default AnimatedTitle;
