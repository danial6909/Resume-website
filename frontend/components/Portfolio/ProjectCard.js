// // components/Portfolio/ProjectCard.jsx
// "use client";
// import React from "react";
// import { motion } from "framer-motion";

// const ProjectCard = ({ project, index, onViewDetails }) => { // اصلاح نام پراپ
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20, scale: 0.9 }}
//       animate={{
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         transition: { delay: index * 0.1 },
//       }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       whileHover={{ y: -5 }}
//       className="relative h-[300px] w-full group [perspective:1000px]"
//     >
//       <div className="relative w-full h-full rounded-2xl transition-all duration-500 border border-border overflow-hidden group-hover:scale-105 border-3 border-primary-accent shadow-lg group-hover:shadow-primary-accent/20">
//         <img
//           src={project.image}
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//           alt={project.title}
//         />
//         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        
//         <div className="absolute left-0 bottom-0 w-full h-[55%] p-5 bg-white/95 backdrop-blur-sm transition-all duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] [transform-origin:bottom] [transform:rotateX(-90deg)] group-hover:[transform:rotateX(0deg)] flex flex-col justify-start z-20">
//           <h3 className="text-black text-lg font-bold mb-1 font-sans">{project.title}</h3>
//           <p className="text-gray-700 text-sm leading-snug line-clamp-2 mb-4 font-sans">{project.desc}</p>
          
//           <button 
//             onClick={onViewDetails} // حالا این تابع به درستی از والد دریافت می‌شود
//             className="mt-auto text-primary-accent text-sm font-bold flex items-center gap-1 hover:gap-3 transition-all cursor-pointer"
//           >
//             مشاهده پروژه <span>←</span>
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProjectCard;











// components/Portfolio/ProjectCard.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // ۱. ایمپورت کامپوننت Image

const ProjectCard = ({ project, index, onViewDetails }) => {
  // یک رشته Base64 بسیار کوچک برای حالت Blur (رنگ خاکستری ملایم)
  const blurData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative h-[300px] w-full group [perspective:1000px]"
    >
      <div className="relative w-full h-full rounded-2xl transition-all duration-500 border border-border overflow-hidden group-hover:scale-105 border-3 border-primary-accent shadow-lg group-hover:shadow-primary-accent/20">
        
        {/* ۲. استفاده از next/image به جای تگ img */}
        <Image
          src={project.image}
          alt={project.title}
          fill // برای پر کردن والد (div)
          placeholder="blur" // فعال‌سازی حالت بلور
          blurDataURL={blurData} // دیتای تصویر مات شده
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        
        {/* بقیه کدها (پنل اطلاعات و دکمه) بدون تغییر باقی می‌ماند */}
        <div className="absolute left-0 bottom-0 w-full h-[55%] p-5 bg-white/95 backdrop-blur-sm transition-all duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] [transform-origin:bottom] [transform:rotateX(-90deg)] group-hover:[transform:rotateX(0deg)] flex flex-col justify-start z-20">
          <h3 className="text-black text-lg font-bold mb-1 font-sans">{project.title}</h3>
          <p className="text-gray-700 text-sm leading-snug line-clamp-2 mb-4 font-sans">{project.desc}</p>
          
          <button 
            onClick={onViewDetails}
            className="mt-auto text-primary-accent text-sm font-bold flex items-center gap-1 hover:gap-3 transition-all cursor-pointer"
          >
            مشاهده پروژه <span>←</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;