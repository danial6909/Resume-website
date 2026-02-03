"use client";
import React from 'react';

/**
 * دانیال عزیز، به دلیل محدودیت محیط پیش‌نمایش در بارگذاری مستقیم کتابخانه‌های خارجی (External Modules)،
 * کد زیر ساختار کامل و استاندارد Swiper.js را دارد. 
 * برای اجرا در پروژه خودت، حتماً دستور زیر را در ترمینال بزن:
 * npm install swiper
 */

// توجه: در محیط لوکال تو، این ایمپورت‌ها بدون مشکل کار خواهند کرد.
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Parallax, EffectCreative } from 'swiper/modules';

// استایل‌های مورد نیاز Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const slides = [
  {
    id: 1,
    title: "توسعه وب‌سایت‌های مدرن",
    description: "ما با استفاده از آخرین تکنولوژی‌های روز، کسب‌وکار شما را به دنیای دیجیتال وارد می‌کنیم.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "طراحی اپلیکیشن موبایل",
    description: "تجربه کاربری بی‌نظیر در تمامی پلتفرم‌های اندروید و iOS با طراحی‌های اختصاصی.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "استراتژی سئو و مارکتینگ",
    description: "دیده شدن در نتایج اول گوگل اتفاقی نیست؛ ما مسیر رشد شما را هموار می‌کنیم.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  }
];

const HeroSlider = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-black absolute top-0 left-0 z-10">
      <Swiper
        dir="rtl"
        speed={1200}
        parallax={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        watchSlidesProgress={true}
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay, Parallax, EffectCreative]}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            {/* Background Image with Parallax */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              data-swiper-parallax="25%"
            >
              <div className="absolute inset-0 bg-black/50 backdrop-brightness-75" />
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
              <div className="max-w-5xl">
                <h1 
                  className="text-5xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl tracking-tight"
                  data-swiper-parallax="-400"
                  data-swiper-parallax-duration="1200"
                >
                  {slide.title}
                </h1>
                <p 
                  className="text-xl md:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg"
                  data-swiper-parallax="-250"
                  data-swiper-parallax-duration="1000"
                >
                  {slide.description}
                </p>
                
                <div 
                  className="flex flex-wrap gap-6 justify-center items-center"
                  data-swiper-parallax="-150"
                  data-swiper-parallax-duration="800"
                >
                  <button className="group relative overflow-hidden bg-white text-black px-12 py-5 rounded-full font-extrabold text-lg hover:pr-14 transition-all duration-300">
                    <span className="relative z-10">شروع همکاری</span>
                    <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
                  </button>
                  
                  <button className="bg-transparent border-2 border-white/40 text-white backdrop-blur-md px-12 py-5 rounded-full font-extrabold text-lg hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    نمونه‌کارها
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* Swiper Custom Navigation Styles */
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(255, 255, 255, 0.05);
          width: 40px !important;
          height: 40px !important;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: scale(1.1);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 24px !important;
        }
          
          .swiper-navigation-icon {
          width: 24px !important;
            height: 24px !important;
        }
        
        /* Custom Pagination Dots */
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.3;
          height: 10px !important;
          width: 10px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 40px !important;
          border-radius: 20px !important;
        }

        /* Prevent text selection during drag */
        .swiper-slide {
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;