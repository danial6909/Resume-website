// app/(main)/page.js
import Image from "next/image";
import background from "@/public/background/background.jpg";
export default function HomePage() {
  return (
    <>
      <Image
        quality={100}
        src={background}
        alt="Background"
        className="w-full h-auto mx-auto  z-0 fixed top-0"
      />


      <div className="text-center z-10 relative px-4 ">
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
