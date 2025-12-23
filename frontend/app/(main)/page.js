// app/(main)/page.js
import Image from "next/image";
import background9 from "@/public/background/background9.jpg";
import back from "@/public/background/back.jpg";
import ServiceCard from "@/components/Main/ServiceCard";
import AnimatedTitle from "@/components/AnimatedTitle";
import StepWork from "@/components/Main/StepWork";
import TestimonialSlider from "@/components/Main/TestimonialSlider";
export default function HomePage() {
  const MobileIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <line x1="12" y1="18" x2="12.01" y2="18"></line>
    </svg>
  );
  const SeoIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  );
  const WebIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );

  return (
    <>
      {/* slider */}
      <Image
        quality={80} // کیفیت 80 برای وب کاملا مناسب و بهینه‌تر است
        src={background9}
        alt="Background"
        className="w-full h-screen top-0 left-0 -z-10"
      />
      {/* <Image
        quality={80} // کیفیت 80 برای وب کاملا مناسب و بهینه‌تر است
        src={back}
        alt="Background"
        className="w-full h-screen   absolute  "
      /> */}
    
      <div className="  flex flex-col items-center justify-center  pt-20  ">
        <AnimatedTitle title="خدمات ما" />

        {/* service */}
        <div className="text-center  z-5  px-4 flex-wrap flex  justify-center gap-10 mt-10 mb-32 ">
          <ServiceCard
            icon={<WebIcon />}
            title="توسعه وب"
            description="طراحی و پیاده‌سازی وب‌سایت‌ها و اپلیکیشن‌های مدرن، واکنش‌گرا و بهینه برای موتورهای جستجو."
            readMore="بیشتر بخوانید"
          />

          {/* --- کارت دوم: اپلیکیشن موبایل --- */}
          <ServiceCard
            icon={<MobileIcon />}
            title="توسعه اپلیکیشن موبایل"
            description="ساخت اپلیکیشن‌های نیتیو و کراس‌پلتفرم برای iOS و Android با تمرکز بر تجربه کاربری و عملکرد بالا."
            readMore="مشاهده جزئیات"
          />

          {/* --- کارت سوم: سئو و بازاریابی --- */}
          <ServiceCard
            icon={<SeoIcon />}
            title="سئو و بازاریابی دیجیتال"
            description="افزایش بازدید و رتبه سایت شما در گوگل با استراتژی‌های مدرن سئو و کمپین‌های بازاریابی هدفمند."
            readMore="شروع کنید"
          />
                 <ServiceCard
            icon={<WebIcon />}
            title="توسعه وب"
            description="طراحی و پیاده‌سازی وب‌سایت‌ها و اپلیکیشن‌های مدرن، واکنش‌گرا و بهینه برای موتورهای جستجو."
            readMore="بیشتر بخوانید"
          />

          {/* --- کارت دوم: اپلیکیشن موبایل --- */}
          <ServiceCard
            icon={<MobileIcon />}
            title="توسعه اپلیکیشن موبایل"
            description="ساخت اپلیکیشن‌های نیتیو و کراس‌پلتفرم برای iOS و Android با تمرکز بر تجربه کاربری و عملکرد بالا."
            readMore="مشاهده جزئیات"
          />

          {/* --- کارت سوم: سئو و بازاریابی --- */}
          <ServiceCard
            icon={<SeoIcon />}
            title="سئو و بازاریابی دیجیتال"
            description="افزایش بازدید و رتبه سایت شما در گوگل با استراتژی‌های مدرن سئو و کمپین‌های بازاریابی هدفمند."
            readMore="شروع کنید"
          />
          <StepWork/>
          <TestimonialSlider/>
        </div>
      </div>
    </>
  );
}
