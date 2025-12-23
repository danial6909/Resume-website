"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';

// وارد کردن استایل‌های اصلی Swiper
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "سوفیا بنت",
    role: "طراح UI/UX",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است."
  },
  {
    name: "لیام هارتمن",
    role: "مدیر سیستم",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 4,
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است."
  },
  {
    name: "آریا محسنی",
    role: "برنامه‌نویس فرانت‌اِند",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    stars: 5,
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است."
  }
];

const TestimonialSlider = () => {
  return (
    <div className="w-full bg-[#0f0f0f] py-20 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 }, // در تبلت و دسکتاپ ۲ اسلاید نمایش بده
          }}
          className="mySwiper !pb-16" // فاصله برای دات‌های پایین
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#161616] rounded-2xl p-8 pt-12 relative border border-gray-800 flex flex-col items-center text-center">
                
                {/* آیکون کوتیشن بالا */}
                <div className="absolute -top-5 right-10 ">
                  <Quote size={40} className="text-[#10b981] fill-[#10b981]  opacity-80" />
                </div>

                {/* تصویر پروفایل */}
                <div className="w-24 h-24 rounded-full border-4 border-[#1e1e1e] overflow-hidden mb-4 shadow-2xl">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* ستاره‌ها */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < item.stars ? "fill-orange-400 text-orange-400" : "text-gray-600"} 
                    />
                  ))}
                </div>

                {/* متن نظر */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 italic">
                  "{item.text}"
                </p>

                {/* مشخصات فرد */}
                <div className="mt-auto">
                  <h4 className="text-white font-bold text-lg">{item.name}</h4>
                  <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{item.role}</p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* استایل سفارشی برای دات‌های Swiper (این بخش را در فایل CSS اصلی هم می‌توانی بگذاری) */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #333 !important;
          opacity: 1 !important;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          background: #10b981 !important;
          width: 25px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;