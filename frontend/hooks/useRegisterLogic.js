// // frontend/hooks/useRegisterLogic.js
// import { useState, useCallback } from 'react';
// import axiosInstance from "../utils/axiosInstance";
// import { useRouter } from 'next/navigation';

// export function useRegisterLogic() {
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

   
//     const register = useCallback(async (username, email, password, password2) => {
        
//       console.log(username , email , password, password2)
//         if (password !== password2) {
//             alert('رمز عبور و تکرار آن یکسان نیستند.');
//             return; 
//         }
        
//         setLoading(true);
//         try {
//             // ارسال داده‌ها (فقط password ارسال می‌شود، نه password2)
//             const response = await axiosInstance.post('/account/register/', { 
//                 email, 
//                 username, 
//                 password,
//                 password2
                
//             });
            
//             console.log('Registration successful:', response.data);
//             alert('ثبت‌نام با موفقیت انجام شد!');
//               router.push('/');
//         } catch (error) {
//             console.error('Registration failed:', error);
            
        
//             const serverError = error.response?.data;
//             let errorMessage = 'ثبت‌نام ناموفق بود. لطفاً دوباره امتحان کنید.';
            
            
//             if (serverError) {
//                 if (serverError.email) errorMessage = `خطای ایمیل: ${serverError.email[0]}`;
//                 else if (serverError.password) errorMessage = `خطای رمز عبور: ${serverError.password[0]}`;
//             }

//             alert(errorMessage);
            
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     return {
//         loading,
//         register,
//     };
// }




"use client"
import { useState, useCallback } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from 'next/navigation';
import { useAuth } from "../context/AuthContext"; // <-- اضافه کردن این خط

export function useRegisterLogic() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useAuth(); // <-- گرفتن تابع setUser برای آپدیت استیت سراسری

    const register = useCallback(async (username, email, password, password2) => {
        if (password !== password2) {
            alert('رمز عبور و تکرار آن یکسان نیستند.');
            return; 
        }
        
        setLoading(true);
        try {
            const response = await axiosInstance.post('/account/register/', { 
                email, 
                username, 
                password,
                password2
            });
            
            // ✅ نکته طلایی: اگر بک‌اِند بعد از ثبت‌نام، اطلاعات کاربر را برمی‌گرداند:
            if (response.data && response.data.user) {
                setUser(response.data.user); // آپدیت کردن هدر و کل اپلیکیشن
            }

            console.log('Registration successful:', response.data);
            alert('ثبت‌نام با موفقیت انجام شد!');
            router.push('/');
        } catch (error) {
            console.error('Registration failed:', error);
            const serverError = error.response?.data;
            let errorMessage = 'ثبت‌نام ناموفق بود. لطفاً دوباره امتحان کنید.';
            
            if (serverError) {
                // مدیریت پیام‌های خطای بک‌اِند (مثلاً جنگو)
                if (serverError.email) errorMessage = `خطای ایمیل: ${serverError.email}`;
                else if (serverError.username) errorMessage = `نام کاربری تکراری است یا خطا دارد.`;
                else if (serverError.password) errorMessage = `خطای رمز عبور: ${serverError.password}`;
            }
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [router, setUser]); // اضافه کردن وابستگی‌ها

    return {
        loading,
        register,
    };
}