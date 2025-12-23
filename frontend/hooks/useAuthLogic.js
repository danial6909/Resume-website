

// frontend/hooks/useAuthLogic.js
import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from 'next/navigation';

export function useAuthLogic() {
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();
    
    const login = useCallback(async (username, password) => {
      
        console.log(username ,typeof(password))
        setLoading(true);
        try {
            const response = await axiosInstance.post('account/login/', { username, password });
            setUser(response.data.user);
            console.log(response.data)

            router.push('/'); // هدایت به داشبورد پس از ورود موفق
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    //      const timer = setTimeout(() => {
      
    //          console.log( "salam nokaram" ,email , password)
    //   // کد مورد نظر شما اینجا اجرا می‌شود
      setLoading(false);
    // }, 5000); // ۲۰۰۰ میلی‌ثانیه = ۲ ثانیه

    }, );

    return {
        user,
        loading,
        login,
    };
}