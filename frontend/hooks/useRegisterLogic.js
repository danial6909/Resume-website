"use client"
import { useState, useCallback } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from 'next/navigation';
import { useAuth } from "../context/AuthContext"; // <-- اضافه کردن این خط

// frontend/hooks/useRegisterLogic.js
export function useRegisterLogic() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useAuth();

    const registerUser = useCallback(async (username, email, password, password2) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/account/register/', { 
                email, 
                username, 
                password,
                password2
            });
            
            if (response.data && response.data.user) {
                setUser(response.data.user);
            }
            return response.data;
        } catch (error) {
            // ارور را به کامپوننت پرتاب می‌کنیم تا setError بتواند آن را بگیرد
            throw error; 
        } finally {
            setLoading(false);
        }
    }, [router, setUser]);

    return { loading, registerUser };
}