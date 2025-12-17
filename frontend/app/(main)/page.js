// app/(main)/page.js
import Image from "next/image";
import background9 from "@/public/background/background9.jpg";
export default function HomePage() {
  return (
    <>
  <Image
    quality={80} // کیفیت 80 برای وب کاملا مناسب و بهینه‌تر است
    src={background9}
    alt="Background"
    className="w-full h-screen   fixed top-0 left-0 -z-10"
/>



      <div className="text-center  z-5 relative px-4 h-screen flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-16">
          به وبسایت من خوش آمدید!
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          اینجا می‌تونید با خدمات و نمونه کارهای من آشنا بشید. برای دسترسی به
          پنل کاربری، از منوی بالا وارد شوید.
        </p>
      </div>
    </>
  );
}
