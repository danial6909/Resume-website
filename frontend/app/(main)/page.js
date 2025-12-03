// import Image from "next/image";

// export default function dashboard() {
//   return (
//    <div>
//     salam nikaram sobet bekheir
//    </div>
    
//   );
// }



// app/(main)/page.js
export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">به وبسایت من خوش آمدید!</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        اینجا می‌تونید با خدمات و نمونه کارهای من آشنا بشید.
        برای دسترسی به پنل کاربری، از منوی بالا وارد شوید.
      </p>
    </div>
  );
}