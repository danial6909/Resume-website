// "use client";
// import React from 'react';

// /**
//  * دانیال عزیز، به دلیل محدودیت محیط پیش‌نمایش در بارگذاری مستقیم کتابخانه‌های خارجی (External Modules)،
//  * کد زیر ساختار کامل و استاندارد Swiper.js را دارد.
//  * برای اجرا در پروژه خودت، حتماً دستور زیر را در ترمینال بزن:
//  * npm install swiper
//  */

// // توجه: در محیط لوکال تو، این ایمپورت‌ها بدون مشکل کار خواهند کرد.
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, Parallax, EffectCreative } from 'swiper/modules';

// // استایل‌های مورد نیاز Swiper
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-creative';

// const slides = [
//   {
//     id: 1,
//     title: "توسعه وب‌سایت‌های مدرن",
//     description: "ما با استفاده از آخرین تکنولوژی‌های روز، کسب‌وکار شما را به دنیای دیجیتال وارد می‌کنیم.",
//     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     title: "طراحی اپلیکیشن موبایل",
//     description: "تجربه کاربری بی‌نظیر در تمامی پلتفرم‌های اندروید و iOS با طراحی‌های اختصاصی.",
//     image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     title: "استراتژی سئو و مارکتینگ",
//     description: "دیده شدن در نتایج اول گوگل اتفاقی نیست؛ ما مسیر رشد شما را هموار می‌کنیم.",
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
//   }
// ];

// const HeroSlider = () => {
//   return (
//     <div className="w-full h-screen overflow-hidden bg-black absolute top-0 left-0 z-10">
//       <Swiper
//         dir="rtl"
//         speed={1200}
//         parallax={true}
//         loop={true}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         watchSlidesProgress={true}
//         grabCursor={true}
//         effect={'creative'}
//         creativeEffect={{
//           prev: {
//             shadow: true,
//             translate: [0, 0, -400],
//           },
//           next: {
//             translate: ['100%', 0, 0],
//           },
//         }}
//         pagination={{
//           clickable: true,
//           dynamicBullets: true,
//         }}
//         navigation={true}
//         modules={[Navigation, Pagination, Autoplay, Parallax, EffectCreative]}
//         className="h-full w-full"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id} className="relative overflow-hidden">
//             {/* Background Image with Parallax */}
//             <div
//               className="absolute inset-0 bg-cover bg-center"
//               style={{ backgroundImage: `url(${slide.image})` }}
//               data-swiper-parallax="25%"
//             >
//               <div className="absolute inset-0 bg-black/50 backdrop-brightness-75" />
//             </div>

//             {/* Content Container */}
//             <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
//               <div className="max-w-5xl">
//                 <h1
//                   className="text-5xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl tracking-tight"
//                   data-swiper-parallax="-400"
//                   data-swiper-parallax-duration="1200"
//                 >
//                   {slide.title}
//                 </h1>
//                 <p
//                   className="text-xl md:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg"
//                   data-swiper-parallax="-250"
//                   data-swiper-parallax-duration="1000"
//                 >
//                   {slide.description}
//                 </p>

//                 <div
//                   className="flex flex-wrap gap-6 justify-center items-center"
//                   data-swiper-parallax="-150"
//                   data-swiper-parallax-duration="800"
//                 >
//                   <button className="group relative overflow-hidden bg-white text-black px-12 py-5 rounded-full font-extrabold text-lg hover:pr-14 transition-all duration-300">
//                     <span className="relative z-10">شروع همکاری</span>
//                     <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
//                   </button>

//                   <button className="bg-transparent border-2 border-white/40 text-white backdrop-blur-md px-12 py-5 rounded-full font-extrabold text-lg hover:bg-white hover:text-black hover:border-white transition-all duration-300">
//                     نمونه‌کارها
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <style jsx global>{`
//         /* Swiper Custom Navigation Styles */
//         .swiper-button-next, .swiper-button-prev {
//           color: white !important;
//           background: rgba(255, 255, 255, 0.05);
//           width: 40px !important;
//           height: 40px !important;
//           border-radius: 50%;
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(12px);
//           transition: all 0.3s ease;
//         }
//         .swiper-button-next:hover, .swiper-button-prev:hover {
//           background: rgba(255, 255, 255, 0.2);
//           border-color: rgba(255, 255, 255, 0.5);
//           transform: scale(1.1);
//         }
//         .swiper-button-next:after, .swiper-button-prev:after {
//           font-size: 24px !important;
//         }

//           .swiper-navigation-icon {
//           width: 24px !important;
//             height: 24px !important;
//         }

//         /* Custom Pagination Dots */
//         .swiper-pagination-bullet {
//           background: white !important;
//           opacity: 0.3;
//           height: 10px !important;
//           width: 10px !important;
//           transition: all 0.3s ease !important;
//         }
//         .swiper-pagination-bullet-active {
//           opacity: 1 !important;
//           width: 40px !important;
//           border-radius: 20px !important;
//         }

//         /* Prevent text selection during drag */
//         .swiper-slide {
//           user-select: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSlider;

// "use client";
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, Parallax, EffectFade } from 'swiper/modules';

// // استایل‌های اصلی Swiper
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// const slides = [
//   {
//     id: 1,
//     title: "توسعه تخصصی MERN Stack",
//     description: "دانیال عزیز، پیاده‌سازی پروژه‌های فول‌استک با معماری تمیز و مقیاس‌پذیر، دقیقاً همان چیزی است که بیزنس شما نیاز دارد.",
//     image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     title: "رابط کاربری مدرن و تعاملی",
//     description: "استفاده از آخرین قابلیت‌های React برای خلق تجربه‌ای کاربرپسند و سریع در تمامی پلتفرم‌ها.",
//     image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
//   }
//   ,{
//     id: 3,
//     title: "کدنویسی تمیز و مقیاس‌پذیر",
//     description: "ساخت اپلیکیشن‌هایی که با رشد بیزنس شما، به راحتی مقیاس‌پذیر و قابل توسعه باشند.",
//     image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
//   }
// ];

// const HeroSlider = () => {
//   return (
//     /* حذف absolute و استفاده از relative برای اینکه زیر هدر قرار بگیرد */
//     <div className="w-full h-[calc(100vh-80px)] min-h-[600px] bg-black absolute top-0 h-screen">
//       <Swiper
//         dir="rtl"
//         speed={1000}
//         parallax={true}
//         loop={true}
//         effect={'fade'}
//         fadeEffect={{ crossFade: true }}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         pagination={{ clickable: true, dynamicBullets: true }}
//         navigation={true}
//         modules={[Navigation, Pagination, Autoplay, Parallax, EffectFade]}
//         className="h-full w-full group"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id} className="relative">

//             {/* تصویر پس‌زمینه با فوکوس روی مانیتورها در سمت چپ */}
//             <div
//               className="absolute inset-0 bg-cover bg-left"
//               style={{ backgroundImage: `url(${slide.image})` }}
//               data-swiper-parallax="20%"
//             >
//               {/* گرادینت مشکی غلیظ در سمت راست برای خوانایی متن */}
//               <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent" />
//             </div>

//             {/* محتوا چسبیده به سمت راست */}
//             <div className="relative h-full container mx-auto px-6 md:px-24 z-10 flex items-center justify-start">
//               <div className="max-w-2xl text-right">
//                 <h1
//                   className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl"
//                   data-swiper-parallax="-500"
//                 >
//                   {slide.title}
//                 </h1>
//                 <p
//                   className="text-lg md:text-2xl text-gray-300 mb-10 leading-relaxed font-light"
//                   data-swiper-parallax="-300"
//                 >
//                   {slide.description}
//                 </p>

//                 <div
//                   className="flex flex-row-reverse justify-end gap-4"
//                   data-swiper-parallax="-150"
//                 >
//                   {/* دکمه با تم سبز درخواستی شما */}
//                   <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-10 py-3.5 rounded-xl font-bold transition-all transform active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
//                     شروع همکاری
//                   </button>
//                   <button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-md px-10 py-3.5 rounded-xl font-bold transition-all">
//                     مشاهده نمونه‌کار
//                   </button>
//                 </div>
//               </div>
//             </div>

//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <style jsx global>{`
//         /* استایل دکمه‌های ناوبری مدرن و سبز */
//         .swiper-button-next, .swiper-button-prev {
//           color: #10b981 !important; /* رنگ سبز زمردی */
//           background: rgba(0, 0, 0, 0.4);
//           width: 60px !important;
//           height: 60px !important;
//           border-radius: 50%;
//           border: 1px solid rgba(16, 185, 129, 0.3);
//           backdrop-filter: blur(12px);
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           opacity: 0; /* در حالت عادی مخفی */
//           transform: scale(0.8);
//         }

//         /* نمایش دکمه‌ها وقتی موس روی اسلایدر می‌رود */
//         .group:hover .swiper-button-next,
//         .group:hover .swiper-button-prev {
//           opacity: 1;
//           transform: scale(1);
//         }

//         .swiper-button-next:hover, .swiper-button-prev:hover {
//           background: #10b981;
//           color: black !important;
//           box-shadow: 0 0 25px rgba(16, 185, 129, 0.5);
//         }

//         .swiper-button-next:after, .swiper-button-prev:after {
//           font-size: 22px !important;
//           font-weight: 900;
//         }

//         /* استایل نقطه چین‌های پایین با تم سبز */
//         .swiper-pagination-bullet {
//           background: #374151 !important;
//           opacity: 1;
//           width: 10px !important;
//           height: 10px !important;
//         }
//         .swiper-pagination-bullet-active {
//           background: #10b981 !important;
//           width: 30px !important;
//           border-radius: 10px !important;
//           box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSlider;

// "use client";
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, Parallax, EffectFade } from 'swiper/modules';

// // استایل‌های ضروری Swiper
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// const slides = [
//   {
//     id: 1,
//     title: "توسعه تخصصی MERN Stack",
//     description: "دانیال عزیز، پیاده‌سازی پروژه‌های فول‌استک با آخرین متدهای روز دنیا و تمرکز بر کارایی بالا.",
//     image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     title: "رابط کاربری مدرن و تعاملی",
//     description: "خلق تجربه‌ای روان و سریع در تمامی پلتفرم‌ها با استفاده از قدرت React و Tailwind CSS.",
//     image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     title: "کدنویسی تمیز و مقیاس‌پذیر",
//     description: "ساخت اپلیکیشن‌هایی که با رشد بیزنس شما، به راحتی قابل توسعه و نگهداری باشند.",
//     image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
//   }
// ];

// const HeroSlider = () => {
//   return (
//     /* چسبیدن به سقف با z-0 تا هدر (با z-10 یا بالاتر) روی این قرار بگیرد */
//     <div className="w-full h-screen bg-black absolute top-0 left-0 z-0">
//       <Swiper
//         dir="rtl"
//         speed={1000}
//         parallax={true}
//         loop={true}
//         effect={'fade'}
//         fadeEffect={{ crossFade: true }}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         pagination={{ clickable: true, dynamicBullets: true }}
//         navigation={true}
//         modules={[Navigation, Pagination, Autoplay, Parallax, EffectFade]}
//         className="h-full w-full group"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id} className="relative overflow-hidden">

//             {/* تصویر پس‌زمینه - فوکوس روی سمت چپ */}
//             <div
//               className="absolute inset-0 bg-cover bg-left md:bg-[left_center]"
//               style={{ backgroundImage: `url(${slide.image})` }}
//               data-swiper-parallax="25%"
//             >
//               {/* گرادینت اول: تاریک کردن سقف برای دیده شدن هدر (Top Overlay) */}
//               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/20" />

//               {/* گرادینت دوم: تاریک کردن سمت راست برای خوانایی متن (Right Overlay) */}
//               <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent" />
//             </div>

//             {/* محتوا - کاملاً سمت راست */}
//             <div className="relative h-full container mx-auto px-6 md:px-24 z-10 flex items-center justify-start">
//               <div className="max-w-3xl text-right mt-20"> {/* فاصله از بالا برای تداخل نکردن با هدر */}
//                 <h1
//                   className="text-5xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl leading-[1.1]"
//                   data-swiper-parallax="-600"
//                 >
//                   {slide.title}
//                 </h1>
//                 <p
//                   className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-light drop-shadow-lg"
//                   data-swiper-parallax="-400"
//                 >
//                   {slide.description}
//                 </p>

//                 <div
//                   className="flex flex-row-reverse justify-end gap-5"
//                   data-swiper-parallax="-200"
//                 >
//                   <button className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_10px_30px_rgba(16,185,129,0.4)] active:scale-95">
//                     شروع همکاری
//                   </button>
//                   <button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-xl px-12 py-4 rounded-2xl font-bold text-lg transition-all">
//                     نمونه‌کارها
//                   </button>
//                 </div>
//               </div>
//             </div>

//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <style jsx global>{`
//         /* دکمه‌های ناوبری بازطراحی شده با تم سبز نئونی */
//         .swiper-button-next, .swiper-button-prev {
//           width: 60px !important;
//           height: 60px !important;
//           background: rgba(16, 185, 129, 0.1) !important;
//           border: 1px solid rgba(16, 185, 129, 0.2) !important;
//           backdrop-filter: blur(10px) !important;
//           border-radius: 20px !important;
//           color: #10b981 !important;
//           transition: all 0.4s ease !important;
//           opacity: 0 !important; /* مخفی در حالت عادی */
//         }

//         .group:hover .swiper-button-next,
//         .group:hover .swiper-button-prev {
//           opacity: 1 !important;
//         }

//         .swiper-button-next:hover, .swiper-button-prev:hover {
//           background: #10b981 !important;
//           color: #000 !important;
//           box-shadow: 0 0 20px rgba(16, 185, 129, 0.5) !important;
//           transform: scale(1.1);
//         }

//         .swiper-button-next:after, .swiper-button-prev:after {
//           font-size: 20px !important;
//           font-weight: bold !important;
//         }

//         /* نقطه چین‌های پایین */
//         .swiper-pagination-bullet {
//           background: rgba(255, 255, 255, 0.3) !important;
//           width: 12px !important;
//           height: 6px !important;
//           border-radius: 4px !important;
//           transition: all 0.3s !important;
//         }
//         .swiper-pagination-bullet-active {
//           background: #10b981 !important;
//           width: 40px !important;
//           box-shadow: 0 0 10px rgba(16, 185, 129, 0.5) !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSlider;

// "use client";
// import React, { useEffect, useState } from 'react';
// import { motion, useMotionValue, useSpring } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, Parallax, EffectFade } from 'swiper/modules';

// // استایل‌های Swiper
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// // --- کامپوننت تک تک دایره‌ها برای ایجاد رد ---
// const CursorStep = ({ delay }) => {
//   const mouseX = useMotionValue(-100);
//   const mouseY = useMotionValue(-100);

//   // تنظیمات نرمی حرکت (Spring) با تاخیرهای متفاوت
//   const springConfig = { damping: 20 + delay * 2, stiffness: 200 - delay * 10 };
//   const x = useSpring(mouseX, springConfig);
//   const y = useSpring(mouseY, springConfig);

//   useEffect(() => {
//     const moveMouse = (e) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//     };
//     window.addEventListener("mousemove", moveMouse);
//     return () => window.removeEventListener("mousemove", moveMouse);
//   }, [mouseX, mouseY]);

//   return (
//     <motion.div
//       style={{
//         x, y,
//         left: -4, top: -4, // برای تراز شدن مرکز دایره با نوک موس
//         opacity: 1 - delay * 0.15,
//         scale: 1 - delay * 0.1,
//       }}
//       className="fixed w-4 h-4 bg-emerald-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
//     />
//   );
// };

// const HeroSlider = () => {
//   const [slides] = useState([
//     {
//       id: 1,
//       title: "توسعه تخصصی MERN Stack",
//       description: "دانیال عزیز، پیاده‌سازی پروژه‌های فول‌استک با آخرین متدهای روز دنیا.",
//       image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
//     },
//     {
//       id: 2,
//       title: "رابط کاربری مدرن",
//       description: "خلق تجربه‌ای روان و سریع با استفاده از قدرت React و Tailwind CSS.",
//       image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
//     }
//   ]);

//   return (
//     <div className=" w-full h-screen bg-black overflow-hidden group absolute top-0">

//       {/* ایجاد ۵ لایه برای افکت رد موس */}
//       <CursorStep delay={0} />
//       <CursorStep delay={1} />
//       <CursorStep delay={2} />
//       <CursorStep delay={3} />
//       <CursorStep delay={4} />

//       <Swiper
//         dir="rtl"
//         speed={1000}
//         parallax={true}
//         loop={true}
//         effect={'fade'}
//         autoplay={{ delay: 5000 }}
//         pagination={{ clickable: true }}
//         navigation={true}
//         modules={[Navigation, Pagination, Autoplay, Parallax, EffectFade]}
//         className="h-full w-full"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id} className="relative overflow-hidden">
//             <div
//               className="absolute inset-0 bg-cover bg-center"
//               style={{ backgroundImage: `url(${slide.image})` }}
//               data-swiper-parallax="20%"
//             >
//               <div className="absolute inset-0 bg-black/50" />
//             </div>

//             <div className="relative h-full flex items-center justify-start container mx-auto px-10 z-10">
//               <div className="max-w-2xl text-right">
//                 <h1 className="text-6xl font-bold text-white mb-6" data-swiper-parallax="-500">
//                   {slide.title}
//                 </h1>
//                 <p className="text-xl text-gray-300 mb-8" data-swiper-parallax="-300">
//                   {slide.description}
//                 </p>
//                 <div className="flex gap-4 justify-end">
//                   <button className="bg-emerald-500 text-black px-8 py-3 rounded-xl font-bold">همکاری</button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <style jsx global>{`
//         .swiper-button-next, .swiper-button-prev { color: #10b981 !important; z-index: 100; }
//         .swiper-pagination-bullet-active { background: #10b981 !important; }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSlider;

// "use client";
// import React, { useEffect, useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, Parallax, EffectFade } from 'swiper/modules';

// // استایل‌های ضروری Swiper
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// // --- کامپوننت ذرات شبکه با Canvas (بدون کتابخانه) ---
// const CanvasNetwork = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let particles = [];
//     let animationFrameId;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.vx = (Math.random() - 0.5) * 0.5; // سرعت حرکت افقی
//         this.vy = (Math.random() - 0.5) * 0.5; // سرعت حرکت عمودی
//         this.radius = Math.random() * 2;
//       }

//       update() {
//         this.x += this.vx;
//         this.y += this.vy;
//         if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
//         if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
//       }

//       draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(16, 185, 129, 0.8)"; // سبز زمردی
//         ctx.fill();
//       }
//     }

//     const init = () => {
//       particles = [];
//       const count = Math.floor((canvas.width * canvas.height) / 15000); // تراکم ذرات
//       for (let i = 0; i < count; i++) particles.push(new Particle());
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < particles.length; i++) {
//         const p1 = particles[i];
//         p1.update();
//         p1.draw();

//         // رسم خطوط اتصال
//         for (let j = i + 1; j < particles.length; j++) {
//           const p2 = particles[j];
//           const dx = p1.x - p2.x;
//           const dy = p1.y - p2.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < 120) {
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(16, 185, 129, ${1 - dist / 120})`;
//             ctx.lineWidth = 0.5;
//             ctx.moveTo(p1.x, p1.y);
//             ctx.lineTo(p2.x, p2.y);
//             ctx.stroke();
//           }
//         }
//       }
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     window.addEventListener('resize', resize);
//     resize();
//     init();
//     animate();

//     return () => {
//       window.removeEventListener('resize', resize);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />;
// };

// // --- اسلایدر اصلی ---
// const slides = [
//   {
//     id: 1,
//     title: "توسعه تخصصی MERN Stack",
//     description: "دانیال عزیز، پیاده‌سازی پروژه‌های فول‌استک با آخرین متدهای روز دنیا.",
//     image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     title: "رابط کاربری مدرن",
//     description: "خلق تجربه‌ای روان و سریع با استفاده از React و Tailwind CSS.",
//     image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
//   }
// ];

// const HeroSlider = () => {
//   return (
//     <div className="relative w-full h-screen bg-black overflow-hidden">

//       {/* فراخوانی افکت ذرات شبکه */}
//       <CanvasNetwork />

//       <Swiper
//         dir="rtl"
//         speed={1000}
//         parallax={true}
//         loop={true}
//         effect={'fade'}
//         fadeEffect={{ crossFade: true }}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         navigation={true}
//         modules={[Navigation, Pagination, Autoplay, Parallax, EffectFade]}
//         className="h-full w-full group"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id} className="relative overflow-hidden">

//             {/* Background Image */}
//             <div
//               className="absolute inset-0 bg-cover bg-center"
//               style={{ backgroundImage: `url(${slide.image})` }}
//               data-swiper-parallax="25%"
//             >
//               <div className="absolute inset-0 bg-black/70 z-0" />
//             </div>

//             {/* Content */}
//             <div className="relative h-full container mx-auto px-6 md:px-24 z-20 flex items-center justify-start">
//               <div className="max-w-3xl text-right pt-20">
//                 <h1
//                   className="text-5xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl"
//                   data-swiper-parallax="-600"
//                 >
//                   {slide.title}
//                 </h1>
//                 <p
//                   className="text-xl md:text-2xl text-gray-300 mb-12 font-light"
//                   data-swiper-parallax="-400"
//                 >
//                   {slide.description}
//                 </p>
//                 <div
//                   className="flex flex-row-reverse justify-end gap-5"
//                   data-swiper-parallax="-200"
//                 >
//                   <button className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 py-4 rounded-2xl font-bold transition-all shadow-[0_10px_30px_rgba(16,185,129,0.4)]">
//                     شروع همکاری
//                   </button>
//                   <button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-xl px-12 py-4 rounded-2xl font-bold transition-all">
//                     نمونه‌کارها
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <style jsx global>{`
//         .swiper-button-next, .swiper-button-prev {
//           color: #10b981 !important;
//           opacity: 0;
//           transition: all 0.3s;
//         }
//         .group:hover .swiper-button-next, .group:hover .swiper-button-prev { opacity: 1; }
//         .swiper-pagination-bullet-active {
//           background: #10b981 !important;
//           width: 35px !important;
//           border-radius: 4px !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSlider;












"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Parallax,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const CanvasBubbles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let bubbles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Bubble {
      constructor() {
        // پخش شدن در کل صفحه از همان ابتدا
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 10 + 3;
        // حرکت تصادفی در جهات مختلف
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;

        this.baseOpacity = Math.random() * 0.4 + 0.2;
        this.currentOpacity = this.baseOpacity;
        this.blinkSpeed = Math.random() * 0.04 + 0.02; // سرعت چشمک زدن
        this.angle = Math.random() * Math.PI * 2; // زاویه شروع برای انیمیشن محو شدن
      }

      update() {
        // حرکت دادن
        this.x += this.vx;
        this.y += this.vy;

        // برخورد با دیواره‌ها (برگشت به داخل)
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // منطق چشمک زدن (محو و ظاهر شدن با تابع سینوسی)
        this.angle += this.blinkSpeed;
        this.currentOpacity =
          (Math.sin(this.angle) * 0.5 + 0.5) * this.baseOpacity;
      }

      draw() {
        if (this.currentOpacity < 0.05) return; // اگر خیلی محو شد رسم نکن

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius,
        );
        gradient.addColorStop(0, `rgba(16, 185, 129, ${this.currentOpacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();

        // لبه براق محو
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.currentOpacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const init = () => {
      bubbles = [];
      const count = 70;
      for (let i = 0; i < count; i++) {
        bubbles.push(new Bubble());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
    />
  );
};

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "توسعه تخصصی MERN Stack",
      description: "دانیال عزیز، پیاده‌سازی پروژه‌های فول‌استک با آخرین متدها.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "کدنویسی تمیز و مقیاس‌پذیر",
      description: "ساخت اپلیکیشن‌هایی که با رشد بیزنس شما، قابل توسعه باشند.",
      image:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <div className="absolute top-0 w-full h-screen bg-black overflow-hidden">
      <CanvasBubbles />
      <Swiper
        dir="rtl"
        speed={1000}
        parallax={true}
        loop={true}
        effect={"fade"}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay, Parallax, EffectFade]}
        className="h-full w-full group"
      >
        {slides.map((slide) => (
  <SwiperSlide key={slide.id} className="relative overflow-hidden">
    {/* تصویر پس‌زمینه */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${slide.image})` }}
      data-swiper-parallax="20%"
    >
      {/* ۱. گرادینت برای تاریک کردن سقف (جهت دیده شدن منو/هدر) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-0" />
      
      {/* ۲. گرادینت از راست به چپ: سمت راست تاریک (برای متن) و سمت چپ کاملاً روشن */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/15 to-transparent z-0" />
    </div>

    {/* محتوا */}
    <div className="relative h-full container mx-auto px-6 md:px-24 z-20 flex items-center justify-start">
      <div className="max-w-3xl text-right">
        <h1
          className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl"
          data-swiper-parallax="-700"
        >
          {slide.title}
        </h1>
        <p
          className="text-xl md:text-2xl text-gray-300 mb-10 drop-shadow-lg"
          data-swiper-parallax="-500"
        >
          {slide.description}
        </p>
        <div
          className="flex flex-row-reverse justify-end gap-5"
          data-swiper-parallax="-300"
        >
          <button className="bg-emerald-500 text-black px-12 py-4 rounded-xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-all active:scale-95">
            شروع همکاری
          </button>
          <button className="bg-white/5 text-white border border-white/20 backdrop-blur-md px-12 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
            نمونه‌کارها
          </button>
        </div>
      </div>
    </div>
  </SwiperSlide>
))}
       
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #10b981 !important;
        }
        .swiper-pagination-bullet-active {
          background: #10b981 !important;
          width: 35px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
