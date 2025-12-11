// frontend/hooks/useRegisterLogic.js
import { useState, useCallback } from 'react';
import axiosInstance from "../utils/axiosInstance";

export function useRegisterLogic() {
    const [loading, setLoading] = useState(false);

   
    const register = useCallback(async (username, email, password, password2) => {
        
      
        if (password !== password2) {
            alert('رمز عبور و تکرار آن یکسان نیستند.');
            return; 
        }
        
        setLoading(true);
        try {
            // ارسال داده‌ها (فقط password ارسال می‌شود، نه password2)
            const response = await axiosInstance.post('/account/api/register/', { 
                username, 
                email, 
                password
                
            });
            
            console.log('Registration successful:', response.data);
            alert('ثبت‌نام با موفقیت انجام شد!');

        } catch (error) {
            console.error('Registration failed:', error);
            
        
            const serverError = error.response?.data;
            let errorMessage = 'ثبت‌نام ناموفق بود. لطفاً دوباره امتحان کنید.';
            
            
            if (serverError) {
                if (serverError.email) errorMessage = `خطای ایمیل: ${serverError.email[0]}`;
                else if (serverError.password) errorMessage = `خطای رمز عبور: ${serverError.password[0]}`;
            }

            alert(errorMessage);
            
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        register,
    };
}