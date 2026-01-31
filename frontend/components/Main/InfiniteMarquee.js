// "use client";
// import React, { useState, useEffect } from "react";
// import Marquee from "react-fast-marquee";

// const technologies = [
//   "JavaScript", "TypeScript", "React.js", "Next.js", 
//   "Node.js", "MongoDB", "Tailwind", "Express"
// ];

// const InfiniteMarquee = () => {
//   const [mounted, setMounted] = useState(false);

//   // برای جلوگیری از باگ‌های رندرینگ در Next.js
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <section className="py-20 bg-background overflow-hidden border-y border-border/30 relative">
      
//       {/* گریدینت‌های کناری */}
//       <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
//       <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

//       <Marquee
//         speed={550}
//         pauseOnHover={true}
//         gradient={false}
//         // autoFill={false}  <-- این رو کلا ننویس یا false بزار
//         direction="left"
//       >
//         {/* لیست رو دو بار رندر می‌کنیم تا فضای خالی ایجاد نشه */}
//         {[...technologies, ...technologies, ...technologies, ...technologies, ...technologies, ...technologies, ...technologies, ...technologies, ...technologies, ...technologies, ...technologies, ...technologies].map((tech, index) => (
//           <div
//             key={index}
//             // اینجا min-w-[150px] گذاشتم که عرض آیتم‌ها مشخص باشه و کتابخانه گیج نشه
//             className="flex items-center justify-center min-w-[150px] px-8 py-4 mx-4 bg-surface/50 backdrop-blur-sm border border-border rounded-2xl group hover:border-primary-accent transition-all duration-300 cursor-pointer"
//           >
//             <span className="text-text-faded group-hover:text-text-main font-bold text-lg select-none">
//               {tech}
//             </span>
//           </div>
//         ))}
//       </Marquee>
//     </section>
//   );
// };

// export default InfiniteMarquee;




"use client";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

const technologies = [
  "JavaScript", "TypeScript", "React.js", "Next.js", 
  "Node.js", "MongoDB", "Tailwind", "Express"
];

const InfiniteMarquee = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 bg-background overflow-hidden border-y border-border/30 relative w-full">
      
      {/* گریدینت‌های کناری */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

      <Marquee
        speed={60} // سرعت ۴۰۰ یا ۵۰۰ خیلی زیاده و باعث پرش میشه، ۶۰-۸۰ عالیه
        pauseOnHover={true}
        gradient={false}
        autoFill={true} // ۱. این رو حتما بذار تا صفحه رو پر کنه
        direction="left"
      >
        {technologies.map((tech, index) => (
          <div
            key={index}
            // ۲. نکته کلیدی: استفاده از w-[180px] به جای min-w
            // این باعث میشه کتابخونه بلافاصله بفهمه چقدر فضا نیازه و هنگ نکنه
            className="flex items-center justify-center w-[180px] h-[60px] mx-4 bg-surface/50 backdrop-blur-sm border border-border rounded-2xl group hover:border-primary-accent transition-all duration-300 cursor-pointer"
          >
            <span className="text-text-faded group-hover:text-text-main font-bold text-lg select-none whitespace-nowrap">
              {tech}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default InfiniteMarquee;