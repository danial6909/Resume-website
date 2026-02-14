// frontend/hooks/useAuthLogic.js
"use client";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from "next/navigation";

// تابع کمکی برای استانداردسازی ارورهای سرور
const parseServerError = (error) => {
  const responseData = error.response?.data;

  // اگر بک‌اِند ساختار errors داشت (مثل فیلد code یا email)
  if (responseData?.errors) {
    return { type: "field_errors", data: responseData.errors };
  }

  // اگر فقط یک پیام کلی داشت
  if (responseData?.message || typeof responseData === "string") {
    return {
      type: "general_error",
      message: responseData.message || responseData || "خطای غیرمنتظره سرور",
    };
  }

  return { type: "general_error", message: "خطا در اتصال به شبکه" };
};

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
  const login = useCallback(async (username, password) => {
    setAuthActionLoading(true);
    try {
      const response = await axiosInstance.post("account/login/", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error)
      throw parseServerError(error);
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

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
        return response.data;
      } catch (error) {
        throw parseServerError(error);
      } finally {
        setAuthActionLoading(false);
      }
    },
    [],
  );

  // ۴. مرحله دوم: تایید کد ۶ رقمی
  const verifyEmail = useCallback(async (code) => {
    
    setAuthActionLoading(true);
    try {
      const response = await axiosInstance.post("account/verify-email/", {
        code,
      });
      if (response.data?.user) setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.log(error)

      throw parseServerError(error);
    } finally {
      setAuthActionLoading(false);
    }
  }, []);



  const resendOTP = useCallback(async (email) => {
    setAuthActionLoading(true);
    try {
      await axiosInstance.post("account/resend-otp/", { email });
    } catch (error) {
      throw parseServerError(error);
    } finally {
      setAuthActionLoading(false);
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
