// frontend/utils/axiosInstance.js
import axios from 'axios';

// 🚀 تعریف آدرس پایه (Base URL)
// در یک پروژه واقعی Next.js، بهتر است این آدرس از متغیرهای محیطی (Environment Variables) خوانده شود
// مثلاً: process.env.NEXT_PUBLIC_API_URL
const BASE_URL = 'http://127.0.0.1:8000/testi/'; 
// فرض می‌کنیم بک‌اند روی پورت 5000 اجرا می‌شود و تمام مسیرها با /api شروع می‌شوند

// 🛠️ ایجاد Instance سفارشی
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // تنظیمات پیش‌فرض هدر
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // در صورت نیاز به Cookie و Credentials (مثلاً برای سشن‌ها)
  // withCredentials: true, 
});

// 🛡️ رهگیر درخواست (Request Interceptor)
// این بخش برای افزودن خودکار توکن JWT به تمام درخواست‌ها استفاده می‌شود.
axiosInstance.interceptors.request.use(
  (config) => {
    // ۱. دریافت اطلاعات کاربر از Local Storage
    const storedUser = localStorage.getItem('user');
    let token = null;

    if (storedUser) {
      // فرض می‌کنیم اطلاعات کاربر شامل توکن JWT است
      try {
        const userObject = JSON.parse(storedUser);
        token = userObject.token;
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }

    // ۲. اگر توکنی وجود داشت، آن را به هدر Authorization اضافه کن
    if (token) {
      // فرمت استاندارد برای ارسال توکن JWT
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🚨 رهگیر پاسخ (Response Interceptor)
// می‌توانید در اینجا خطاهای رایج (مثلاً 401 Unauthorized) را به صورت متمرکز مدیریت کنید
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // اگر کد خطا 401 بود، کاربر را به صفحه ورود هدایت کنید
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Redirecting to login.');
      // ⚠️ توجه: در محیط واقعی، اینجا باید منطق Logout و هدایت به صفحه ورود اجرا شود.
      // مثلاً: store.dispatch(logout());
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;