"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "./LoginForm.module.css";
import ParticlesBackground from "../LoginBackground/ParticlesBackground";
import { useAuth } from "@/context/AuthContext";
import Loader from "../Loader/Loader";

// ۱. تنظیم Schema برای یوزرنیم
const loginSchema = z.object({
  username: z
    .string()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
    .max(20, "نام کاربری خیلی طولانی است"),
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export default function LoginForm() {
  const { login, loading } = useAuth();
  
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" }
  });

  // تماشای مقدار یوزرنیم برای انیمیشن لبل
  const watchUsername = watch("username");
  const watchPassword = watch("password");

  const onSubmit = async (data) => {
    try {
      // حالا دیتایی که ارسال میشه شامل { username, password } هست
      await login(data.username, data.password);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        
        if (status === 401 || status === 403) {
          setError("password", { type: "server", message: "نام کاربری یا رمز عبور اشتباه است" });
        } else if (status === 404) {
          setError("username", { type: "server", message: "کاربری با این نام یافت نشد" });
        } else {
          setError("root", { type: "server", message: "خطایی در سرور رخ داده است" });
        }
      } else {
        setError("root", { type: "server", message: "خطا در اتصال به شبکه" });
      }
    }
  };

  return (
    <div className={styles.container}>
      <ParticlesBackground />

      <div className={styles.formContainer}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className={styles.formTitle}>خوش آمدید</h1>
            <div className={styles.formDivider}></div>
            
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              
              {/* فیلد نام کاربری */}
              <div className={styles.formGroup}>
                <label
                  htmlFor="username"
                  className={`${styles.formLabel} ${
                    isUserFocused || watchUsername ? styles.floating : ""
                  }`}
                >
                  نام کاربری
                </label>
                <input
                  id="username"
                  type="text" // تغییر از email به text
                  spellCheck="false"
                  className={`${styles.formInput} ${errors.username ? styles.inputError : ""}`}
                  {...register("username")}
                  onFocus={() => setIsUserFocused(true)}
                  onBlur={() => setIsUserFocused(false)}
                  dir="ltr"
                />
                {errors.username && (
                  <span className={styles.errorMessage}>{errors.username.message}</span>
                )}
              </div>

              {/* فیلد رمز عبور */}
              <div className={styles.formGroup}>
                <label
                  htmlFor="password"
                  className={`${styles.formLabel} ${
                    isPasswordFocused || watchPassword ? styles.floating : ""
                  }`}
                >
                  رمز عبور
                </label>
                <input
                  id="password"
                  type="password"
                  className={`${styles.formInput} ${errors.password ? styles.inputError : ""}`}
                  {...register("password")}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  placeholder={isPasswordFocused ? "" : "••••••••"}
                  dir="ltr"
                />
                {errors.password && (
                  <span className={styles.errorMessage}>{errors.password.message}</span>
                )}
              </div>

              {errors.root && (
                <div className={styles.errorMessage} style={{ position: 'static', marginBottom: '10px', justifyContent: 'center' }}>
                  {errors.root.message}
                </div>
              )}

              <div className={styles.formRow}>
                <label className={styles.remember}>
                  <input type="checkbox" />
                  مرا به خاطر بسپار
                </label>
                <a href="/forgetPassword" className={styles.forgot}>
                  فراموشی رمز عبور
                </a>
              </div>

              <button type="submit" className={styles.formSubmitBtn}>
                ورود به حساب
              </button>
            </form>
            
            <p className={styles.signupText}>
              حساب کاربری ندارید؟ <a href="/register">ثبت‌نام کنید</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}