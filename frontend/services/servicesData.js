// constants/servicesData.js
export const servicesData = [
  {
    id: 1,
    slug: "web-development",
    title: "توسعه وب",
    description: "طراحی و پیاده‌سازی وب‌سایت‌ها و اپلیکیشن‌های مدرن، واکنش‌گرا و بهینه.",
    fullDescription: "تیم ما با استفاده از اکوسیستم React و Next.js وب‌سایت‌هایی می‌سازد که نه تنها زیبا هستند، بلکه با رعایت اصول Core Web Vitals، سرعت لود فوق‌العاده‌ای دارند. ما تمرکز ویژه‌ای روی تجربه کاربری (UX) و سئو داریم.",
    iconType: "web",
    features: ["Next.js 15 & React", "Tailwind CSS", "SEO Optimization", "PWA Integration"],
  },
  {
    id: 2,
    slug: "mobile-app",
    title: "اپلیکیشن موبایل",
    description: "ساخت اپلیکیشن‌های نیتیو و کراس‌پلتفرم برای iOS و Android.",
    fullDescription: "ما با استفاده از فریم‌ورک‌های قدرتمندی مثل Flutter و React Native، اپلیکیشن‌هایی طراحی می‌کنیم که در عین داشتن یک کد بیس واحد، تجربه کاربری کاملاً نیتیو و روانی را در هر دو پلتفرم ارائه می‌دهند.",
    iconType: "mobile",
    features: ["Flutter & Dart", "Firebase Integration", "Clean Architecture", "Push Notifications"],
  },
  {
    id: 3,
    slug: "seo-optimization",
    title: "سئو و بهینه‌سازی",
    description: "افزایش رتبه سایت در موتورهای جستجو و جذب ترافیک هدفمند.",
    fullDescription: "خدمات سئوی ما شامل سئوی تکنیکال، تحقیق کلمات کلیدی و استراتژی محتوا است تا بیزنس شما در کلمات کلیدی پولساز به رتبه‌های برتر گوگل برسد.",
    iconType: "seo",
    features: ["Technical SEO", "Keyword Research", "Content Strategy", "Backlink Building"],
  },
  {
    id: 4,
    slug: "ui-ux-design",
    title: "طراحی رابط کاربری",
    description: "خلق تجربه‌های دیجیتال جذاب و کاربرپسند با استفاده از Figma.",
    fullDescription: "طراحی مدرن و اختصاصی متناسب با هویت برند شما. ما با متدهای روز دنیا، وایرفریم‌ها و پروتوتایپ‌هایی می‌سازیم که تبدیل (Conversion) سایت شما را افزایش می‌دهد.",
    iconType: "web",
    features: ["Figma Design", "User Flow", "Design System", "Interactive Prototype"],
  },
  {
    id: 5,
    slug: "backend-nodejs",
    title: "توسعه سمت سرور",
    description: "ساخت سیستم‌های بک‌اند قدرتمند، امن و مقیاس‌پذیر با Node.js.",
    fullDescription: "پیاده‌سازی معماری‌های میکروسرویس یا یکپارچه با استفاده از Node.js و پایگاه‌ داده‌های MongoDB/PostgreSQL برای مدیریت داده‌های سنگین.",
    iconType: "mobile",
    features: ["Node.js & Express", "MongoDB / SQL", "RESTful API", "JWT Security"],
  },
  {
    id: 6,
    slug: "support-maintenance",
    title: "پشتیبانی و نگهداری",
    description: "تضمین عملکرد بدون وقفه و بروزرسانی مداوم پروژه‌های شما.",
    fullDescription: "ما پروژه‌های شما را رها نمی‌کنیم. پشتیبانی فنی شامل رفع باگ، مانیتورینگ سرور و بروزرسانی کتابخانه‌ها برای حفظ امنیت و سرعت پروژه است.",
    iconType: "seo",
    features: ["24/7 Monitoring", "Bug Fixing", "Security Updates", "Backup Management"],
  },
];

export const getServiceBySlug = (slug) => {
  return servicesData.find((service) => service.slug === slug);
};