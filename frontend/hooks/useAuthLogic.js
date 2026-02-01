
// "use client"
// // frontend/hooks/useAuthLogic.js
// import { useState, useEffect, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// import axiosInstance from "../utils/axiosInstance";
// import { useRouter } from 'next/navigation';

// export function useAuthLogic() {
//     // const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [user, setUser] = useState(null);
//     const router = useRouter();
    
//     const login = useCallback(async (username, password) => {
      
//         console.log(username ,typeof(password))
//         setLoading(true);
//         try {
//             const response = await axiosInstance.post('account/login/', { username, password });
//             setUser(response.data.user);
//             console.log(response.data)

//             router.push('/'); // هدایت به داشبورد پس از ورود موفق
//         } catch (error) {
//             console.error('Login failed:', error);
//             alert('Login failed. Please check your credentials.');
//         } finally {
//             setLoading(false);
//         }
//     //      const timer = setTimeout(() => {
      
//     //          console.log( "salam nokaram" ,email , password)
//     //   // کد مورد نظر شما اینجا اجرا می‌شود
//       setLoading(false);
//     // }, 5000); // ۲۰۰۰ میلی‌ثانیه = ۲ ثانیه

//     }, );

//     return {
//         user,
//         loading,
//         login,
//     };
// }



















"use client"
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from 'next/navigation';

export function useAuthLogic() {
    const [loading, setLoading] = useState(true); // برای جلوگیری از پرش صفحه با true شروع می‌کنیم
    const [user, setUser] = useState(null);
    const router = useRouter();

    // تابع برای چک کردن وضعیت لاگین با استفاده از کوکی
    const getMe = useCallback(async () => {
        try {
            // این اندپوینت باید در بک‌اِند ساخته شود تا اطلاعات کاربر را از روی کوکی برگرداند
            const response = await axiosInstance.get('account/me/'); 
            setUser(response.data.user);
        } catch (error) {
            console.log("کاربر لاگین نیست");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // اجرای خودکار getMe هنگام لود شدن سایت یا رفرش
    useEffect(() => {
        getMe();
    }, [getMe]);

// frontend/hooks/useAuthLogic.js
const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
        const response = await axiosInstance.post('account/login/', { username, password });
        setUser(response.data.user);
        router.push('/');
        return { success: true }; // سیگنال موفقیت
    } catch (error) {
        console.error('Login failed:', error);
        // ارور رو پرتاب می‌کنیم تا LoginForm بتونه توی catch خودش بگیردش
        throw error; 
    } finally {
        setLoading(false);
    }
}, [router]);


    const logout = useCallback(async () => {
    setLoading(true);
    try {
        // ۱. درخواست به بک‌اند برای پاک کردن کوکی
        await axiosInstance.post('account/logout/'); 
    } catch (error) {
        console.error('Logout failed:', error);
    } finally {
        // ۲. پاک کردن استیت کاربر در فرانت (حتی اگر درخواست سرور خطا داد)
        setUser(null);
        setLoading(false);
        // ۳. هدایت به صفحه اصلی یا لاگین
        router.push('/login');
    }
}, [router]);

    return {
        user,
        loading,
        login,
        logout,
        getMe // برای مواقعی که لازم است دستی دیتا را بروزرسانی کنی
    };
}