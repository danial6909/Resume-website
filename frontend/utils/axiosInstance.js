import axios from "axios";

// 🚀 تعریف آدرس پایه (Base URL)
const BASE_URL = "https://dev-api.kelidari.ir/api/v1/";

// 🛠️ ایجاد Instance سفارشی
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // ✅ بسیار مهم: اجازه می‌دهد مرورگر کوکی‌های HttpOnly را به صورت خودکار ارسال کند
  withCredentials: true,
});




// 🛡️ رهگیر درخواست (Request Interceptor)
axiosInstance.interceptors.request.use(
  (config) => {
    // اگر اکسس توکن را در حافظه موقت (مثلاً Zustand یا یک متغیر) ذخیره کرده‌ای،
    // می‌توانی اینجا به هدر اضافه کنی.
    // اما اگر بک‌اِند تو اکسس‌توکن را هم در کوکی ست می‌کند، کلا به این بخش نیاز نداری.

    // فرض بر این است که اکسس توکن در یک متغیر است (امن‌ترین حالت فرانت)
    // const token = window.MY_ACCESS_TOKEN;
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 🚨 رهگیر پاسخ (Response Interceptor) - مدیریت هوشمند توکن‌ها
axiosInstance.interceptors.response.use(
  (response) => {
    // اگر پاسخ موفق بود، مستقیم برگردان
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // ۱. بررسی خطای 401 (منقضی شدن توکن)
    // _retry برای این است که در یک حلقه بی‌نهایت نیفتیم
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Access token expired. Attempting to refresh...");

        // ۲. ارسال درخواست به اندپوینت رفرش
        // بک‌اِند در این مرحله کوکی رفرش‌توکن را می‌خواند و کوکی‌های جدید ست می‌کند
        const response2 = await axios.post(
          `${BASE_URL}account/refresh-token/`,
          { refresh: "" },
          { withCredentials: true },
        );
        console.log("Refresh response:", response2);

        // ۳. اگر رفرش موفق بود، درخواست اصلی را دوباره ارسال کن
        console.log("Token refreshed successfully!");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed!");

        // ۱. حتما توکن‌های خراب رو از استیت یا کوکی پاک کن
        // اگر پاک نکنی، درخواست بعدی دوباره فکر می‌کنه توکن داره و ۴۰۱ می‌گیره

        // if (typeof window !== "undefined") {
        //   // ۲. به جای استفاده از window.location که کل صفحه رو لود می‌کنه
        //   // از router.push خودِ Next.js استفاده کن (اگر داخل کامپوننت هستی)
        //   // یا فقط زمانی هدایت کن که در صفحه لاگین نیستی!

        //   if (window.location.pathname !== "/login") {
        //     window.location.href = "/login";
        //   }
        // }
        return Promise.reject(refreshError);
      }
    }

    // برای سایر خطاها (مثل 404 یا 500)
    return Promise.reject(error);
  },
);

export default axiosInstance;
