// frontend/hooks/useAuthLogic.js
"use client"
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from 'next/navigation';

export function useAuthLogic() {
    const [loading, setLoading] = useState(true); // برای چک کردن اولیه وضعیت لاگین
    const [user, setUser] = useState(null);
    const [authActionLoading, setAuthActionLoading] = useState(false); // لودینگ مخصوص دکمه‌های فرم
    const router = useRouter();

    // ۱. دریافت اطلاعات کاربر (پروفایل)
    // یک جایی مشکل داره اسکرول میکنی هدر رو کلی لاگ گرفته میشه
    const getMe = useCallback(async () => {
       

        try {
            const response = await axiosInstance.get('account/me/'); 
            setUser(response.data.user);
         
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getMe();
    }, [getMe]);

    // ۲. منطق ورود (Login)
    const login = useCallback(async (username, password) => {
        setAuthActionLoading(true);
        try {
            const response = await axiosInstance.post('account/login/', { username, password });
            setUser(response.data.user);
           
            router.push('/');
            return response.data;
        } finally {
            setAuthActionLoading(false);
        }
    }, [router]);

    // ۳. منطق ثبت‌نام (Register)
    const registerUser = useCallback(async (username, email, password, password2) => {
        setAuthActionLoading(true);
        try {
            const response = await axiosInstance.post('account/register/', { 
                username, email, password, password2 
            });
            // اگر بک‌اِند بعد از ثبت‌نام مستقیم لاگین می‌کند:
            if (response.data?.user) setUser(response.data.user);
            router.push('/');
            return response.data;
        } finally {
            setAuthActionLoading(false);
        }
    }, [router]);

    // ۴. منطق خروج (Logout)
    const logout = useCallback(async () => {
        setAuthActionLoading(true);
        try {
            await axiosInstance.post('account/logout/'); 
        } finally {
            setUser(null);
            setAuthActionLoading(false);
            router.push('/login');
        }
    }, [router]);

    return {
        user,
        loading,           // لودینگ کل اپلیکیشن در شروع
        authActionLoading, // لودینگ دکمه‌های سابمیت
        login,
        registerUser,
        logout,
        getMe
    };
}