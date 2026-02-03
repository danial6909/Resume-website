// app/(main)/page.js
import Image from "next/image";
import background9 from "@/public/background/background9.jpg";
import back from "@/public/background/back.jpg";
import ServiceCard from "@/components/Main/ServiceCard";
import AnimatedTitle from "@/components/AnimatedTitle";
import StepWork from "@/components/Main/StepWork";
import TestimonialSlider from "@/components/Main/TestimonialSlider";
import InfiniteMarquee from "@/components/Main/InfiniteMarquee";
import HeroSlider from "@/components/Header/HeroSlider";
import NumberWork from "@/components/Main/NumberWork";
import ProjectRoadmap from "@/components/Main/ProjectRoadmap";

// داده‌های نمونه برای کارت‌ها (مثلاً نظرات مشتریان یا تکنولوژی‌ها)

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
      <HeroSlider />
      <div className="w-full h-screen  z-1"></div>
      {/* slider */}
      {/* <Image
        quality={80} // کیفیت 80 برای وب کاملا مناسب و بهینه‌تر است
        src={background9}
        alt="Background"
        className="w-full h-screen top-0 left-0 -z-10"
        priority
      /> */}
      {/* <Image
        quality={80} // کیفیت 80 برای وب کاملا مناسب و بهینه‌تر است
        src={back}
        alt="Background"
        className="w-full h-screen   absolute  "
      /> */}

      <main className="flex flex-col items-center justify-center pt-5 pb-20 overflow-x-hidden ">
        <AnimatedTitle title="خدمات ما" />

        {/* بخش خدمات - اصلاح گرید */}
        <div className=" mx-auto px-4 mt-12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center ">
            <ServiceCard
              icon={<WebIcon />}
              title="توسعه وب"
              description="طراحی و پیاده‌سازی وب‌سایت‌ها و اپلیکیشن‌های مدرن، واکنش‌گرا و بهینه."
              readMore="بیشتر بخوانید"
            />
            <ServiceCard
              icon={<MobileIcon />}
              title="اپلیکیشن موبایل"
              description="ساخت اپلیکیشن‌های نیتیو و کراس‌پلتفرم برای iOS و Android."
              readMore="مشاهده جزئیات"
            />
            <ServiceCard
              icon={<SeoIcon />}
              title="سئو و مارکتینگ"
              description="افزایش بازدید و رتبه سایت شما در گوگل با استراتژی‌های مدرن."
              readMore="شروع کنید"
            />
            <ServiceCard
              icon={<WebIcon />}
              title="توسعه وب"
              description="طراحی و پیاده‌سازی وب‌سایت‌ها و اپلیکیشن‌های مدرن، واکنش‌گرا و بهینه."
              readMore="بیشتر بخوانید"
            />
            <ServiceCard
              icon={<MobileIcon />}
              title="اپلیکیشن موبایل"
              description="ساخت اپلیکیشن‌های نیتیو و کراس‌پلتفرم برای iOS و Android."
              readMore="مشاهده جزئیات"
            />
            <ServiceCard
              icon={<SeoIcon />}
              title="سئو و مارکتینگ"
              description="افزایش بازدید و رتبه سایت شما در گوگل با استراتژی‌های مدرن."
              readMore="شروع کنید"
            />
            {/* سایر کارت‌ها را اینجا اضافه کن */}
          </div>
        </div>

        <ProjectRoadmap />

        <div className=" max-w-7xl w-full ">
          <NumberWork />
        </div>

        {/* اسلایدر نظرات باید خارج از گرید خدمات باشد تا تمام‌عرض شود */}

        <div className="w-full mt-20 flex flex-col items-center px-4">
          <AnimatedTitle title="نظرات مشتریان" />

          <TestimonialSlider />
        </div>

    

        {/* بخش Marquee */}
        <div className="">
       
          {/* اینجا نباید هیچ کلاس عجیبی مثل flex یا items-start باشد */}
          <InfiniteMarquee direction="left" speed={450} />
        </div>
      </main>
    </>
  );
}
