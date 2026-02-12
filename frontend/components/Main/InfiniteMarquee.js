"use client";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image"; // اضافه شد

const technologies = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  // جایگزین‌های جدید طبق درخواست تو
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "SQL", logo: "https://www.svgrepo.com/show/331760/sql-database-generic.svg" },
  { name: "Tailwind", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
];

const InfiniteMarquee = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 bg-background overflow-hidden border-y border-border/30 relative">
      
      {/* گریدینت‌های کناری */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

      <Marquee
        speed={60}
        pauseOnHover={true}
        gradient={false}
        direction="left"
      >
        {[...technologies, ...technologies, ...technologies, ...technologies, ...technologies].map((tech, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-4 min-w-[200px] px-8 py-4 mx-4 bg-surface/50 backdrop-blur-sm border border-border rounded-2xl group hover:border-primary-accent transition-all duration-300 cursor-pointer"
          >
            {/* استفاده از Image با سایز بهینه */}
            <div className={`relative grayscale group-hover:grayscale-0 transition-all duration-300 ${
              tech.name === "Tailwind" ? "h-7 w-9" : "h-7 w-7"
            }`}>
              <Image 
                src={tech.logo} 
                alt={tech.name} 
                fill // استفاده از fill برای کنترل سایز توسط div پدر
                className="object-contain"
              />
            </div>
            
            <span className="text-text-faded group-hover:text-text-main font-bold text-lg select-none">
              {tech.name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default InfiniteMarquee;


// "use client";
// import React, { useState, useEffect } from "react";
// import Marquee from "react-fast-marquee";

// const technologies = [
//   "JavaScript", "TypeScript", "React.js", "Next.js", 
//   "Node.js", "MongoDB", "Tailwind", "Express"
// ];

// const InfiniteMarquee = () => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <section className="py-20 bg-background overflow-hidden border-y border-border/30 relative w-full">
      
//       {/* گریدینت‌های کناری */}
//       <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
//       <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

//       <Marquee
//         speed={60} // سرعت ۴۰۰ یا ۵۰۰ خیلی زیاده و باعث پرش میشه، ۶۰-۸۰ عالیه
//         pauseOnHover={true}
//         gradient={false}
//         autoFill={true} // ۱. این رو حتما بذار تا صفحه رو پر کنه
//         direction="left"
//       >
//         {technologies.map((tech, index) => (
//           <div
//             key={index}
//             // ۲. نکته کلیدی: استفاده از w-[180px] به جای min-w
//             // این باعث میشه کتابخونه بلافاصله بفهمه چقدر فضا نیازه و هنگ نکنه
//             className="flex items-center justify-center w-[180px] h-[60px] mx-4 bg-surface/50 backdrop-blur-sm border border-border rounded-2xl group hover:border-primary-accent transition-all duration-300 cursor-pointer"
//           >
//             <span className="text-text-faded group-hover:text-text-main font-bold text-lg select-none whitespace-nowrap">
//               {tech}
//             </span>
//           </div>
//         ))}
//       </Marquee>
//     </section>
//   );
// };

// export default InfiniteMarquee;