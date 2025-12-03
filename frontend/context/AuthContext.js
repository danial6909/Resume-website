// frontend/context/AuthContext.js
"use client";
import React, { createContext, useContext } from "react";
//   وارد کردن هوک منطق
import { useAuthLogic } from "../hooks/useAuthLogic"; 

const AuthContext = createContext(null);

export const useAuth = () => {
    // هوک مصرفی ساده
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    //   استفاده از هوک منطق برای دریافت تمام مقادیر
    const auth = useAuthLogic();    

    //   ارسال تمام مقادیر هوک به Context
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};