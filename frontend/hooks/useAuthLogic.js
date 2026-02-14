// frontend/hooks/useAuthLogic.js
"use client";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from "next/navigation";

export function useAuthLogic() {
  const [loading, setLoading] = useState(true); // برای چک کردن اولیه وضعیت لاگین
  const [user, setUser] = useState(null);
  const [authActionLoading, setAuthActionLoading] = useState(false); // لودینگ مخصوص دکمه‌های فرم
  const router = useRouter();

  // ۱. دریافت اطلاعات کاربر (پروفایل)
  // یک جایی مشکل داره اسکرول میکنی هدر رو کلی لاگ گرفته میشه
  const getMe = useCallback(async () => {
    try {
      const response = await axiosInstance.get("account/me/");
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMe();
  }, []);

// در فایل useAuthLogic.js تابع لاگین رو اینطوری تغییر بده:
const login = useCallback(
  async (username, password) => {
    setAuthActionLoading(true);
    try {
      const response = await axiosInstance.post("account/login/", {
        username,
        password,
      });
      
      // لاگ برای دیدن پاسخ بک‌اِند (مشابه رجیستر)
      console.log("Login Response:", response.data);
      
      // اینجا router.push رو حذف کردیم تا کاربر اول کد ۶ رقمی رو بزنه
      return response.data; 
    } finally {
      setAuthActionLoading(false);
    }
  },
  [] // دیگر به router نیاز ندارد چون ریدایرکت نمی‌کنیم
);

  // ۳. منطق ثبت‌نام (Register)
  const registerUser = useCallback(
    async (username, email, password, password2) => {
      setAuthActionLoading(true);
      try {
        const response = await axiosInstance.post("account/register/", {
          username,
          email,
          password,
          password2,
        });
        // اینجا دیگه روت رو عوض نمی‌کنیم، چون باید کد تایید بگیره
        console.log(response)
        return response.data; 
      } finally {
        setAuthActionLoading(false);
      }
    },
    []
  );

  // ۴. مرحله دوم: تایید کد ۶ رقمی
  const verifyEmail = useCallback(
    async ( otp) => {
      const code = otp; // چون الان فقط کد رو داریم، ایمیل رو نمی‌فرستیم. سرور باید از کوکی بخونه.
      console.log(code)
      setAuthActionLoading(true);
      try {
        const response = await axiosInstance.post("account/verify-email/", {
          
          code,
        });
        // بعد از تایید کد، کاربر لاگین می‌شود و اطلاعاتش برمی‌گردد
        if (response.data?.user) setUser(response.data.user);
        router.push("/");
        // return response.data;
        return ; // فقط برای تست کردن مرحله بعدی، چون هنوز سرور کد OTP رو برنمی‌گردونه
      } finally {
        setAuthActionLoading(false);
      }
    },
    [router]
  );


//   const verifyEmail = useCallback(
//   async (email, otp) => {
//     setAuthActionLoading(true);
//     try {
//       // شبیه‌سازی تاخیر شبکه
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // چک کردن کد دستی (بجای سرور)
//       if (otp === "123456") {
//         console.log("تبریک! کد درست بود.");
        
//         const mockUser = { username: "Danial", email: email };
//         setUser(mockUser);
        
//         // این یعنی همه چیز اوکیه و SignUpForm میره برای نمایش Success
//         return { success: true }; 
//       } else {
//         // شبیه‌سازی ارور سرور وقتی کد غلطه
//         throw {
//           response: {
//             data: "کد وارد شده صحیح نیست. لطفاً دوباره تلاش کنید."
//           }
//         };
//       }
//     } finally {
//       setAuthActionLoading(false);
//     }
//   },
//   [setUser] // وابستگی‌ها رو دقیق بزار که استاندارد باشه
// );

  // ۵. ارسال مجدد کد
  const resendOTP = useCallback(async (email) => {
    try {
      await axiosInstance.post("account/resend-otp/", { email });
    } catch (error) {
      console.error("خطا در ارسال مجدد کد", error);
    }
  }, []);

  // ۴. منطق خروج (Logout)
  const logout = useCallback(async () => {
    setAuthActionLoading(true);
    try {
      await axiosInstance.post("account/logout/");
    } finally {
      setUser(null);
      setAuthActionLoading(false);
      router.push("/login");
    }
  }, [router]);

  return {
    user,
    loading, // لودینگ کل اپلیکیشن در شروع
    authActionLoading, // لودینگ دکمه‌های سابمیت
    login,
    registerUser,
    verifyEmail,
    resendOTP,
    logout,
    getMe,
  };
}
