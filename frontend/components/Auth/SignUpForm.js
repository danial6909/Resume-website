"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "./SignUpForm.module.css";
import ParticlesBackground from "../LoginBackground/ParticlesBackground";
import { useRegisterLogic } from "@/hooks/useRegisterLogic";

// تعریف قوانین ثبت‌نام با Zod
const signUpSchema = z.object({
  username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
  email: z.string().email("فرمت ایمیل صحیح نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "رمز عبور و تکرار آن یکسان نیستند",
  path: ["confirmPassword"], // ارور را روی فیلد تکرار رمز نشان می‌دهد
});

export default function SignUpForm() {
  const { loading, registerUser } = useRegisterLogic();
  
  // استیت‌های فوکوس برای انیمیشن لبل‌ها
  const [focusFields, setFocusFields] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" }
  });

  const values = watch();

  const handleFocus = (field) => setFocusFields(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field) => setFocusFields(prev => ({ ...prev, [field]: false }));

  const onSubmit = async (data) => {
    try {
      await registerUser(data.username, data.email, data.password, data.confirmPassword);
      alert('ثبت‌نام با موفقیت انجام شد!');
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        // مدیریت هوشمند ارورهای بک‌اندر (جنگو یا Node)
        if (serverErrors.username) setError("username", { message: "این نام کاربری قبلاً انتخاب شده است" });
        if (serverErrors.email) setError("email", { message: "این ایمیل قبلاً ثبت‌نام شده است" });
        if (!serverErrors.username && !serverErrors.email) {
          setError("root", { message: "ثبت‌نام ناموفق بود. دوباره تلاش کنید." });
        }
      } else {
        setError("root", { message: "خطا در اتصال به شبکه" });
      }
    }
  };

  return (
    <div className={styles.container}>
      <ParticlesBackground />

      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>ثبت‌نام</h1>
        <div className={styles.formDivider}></div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          
          {/* فیلد نام کاربری */}
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${focusFields.username || values.username ? styles.floating : ''}`}>
              نام کاربری
            </label>
            <input
              {...register("username")}
              onFocus={() => handleFocus("username")}
              onBlur={() => handleBlur("username")}
              className={`${styles.formInput} ${errors.username ? styles.inputError : ""}`}
              dir="ltr"
            />
            {errors.username && <span className={styles.errorMessage}>{errors.username.message}</span>}
          </div>

          {/* فیلد ایمیل */}
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${focusFields.email || values.email ? styles.floating : ''}`}>
              ایمیل
            </label>
            <input
              {...register("email")}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
              placeholder="you@company.com"
              dir="ltr"
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
          </div>

          {/* فیلد رمز عبور */}
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${focusFields.password || values.password ? styles.floating : ''}`}>
              رمز عبور
            </label>
            <input
              type="password"
              {...register("password")}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
              className={`${styles.formInput} ${errors.password ? styles.inputError : ""}`}
              placeholder="••••••••"
              dir="ltr"
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
          </div>

          {/* فیلد تکرار رمز عبور */}
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${focusFields.confirmPassword || values.confirmPassword ? styles.floating : ''}`}>
              تکرار رمز عبور
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              onFocus={() => handleFocus("confirmPassword")}
              onBlur={() => handleBlur("confirmPassword")}
              className={`${styles.formInput} ${errors.confirmPassword ? styles.inputError : ""}`}
              placeholder="••••••••"
              dir="ltr"
            />
            {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>}
          </div>

          {errors.root && (
            <div className={styles.errorMessage} style={{ position: 'static', textAlign: 'center', marginBottom: '10px' }}>
              {errors.root.message}
            </div>
          )}

          <button type="submit" className={styles.formSubmitBtn} disabled={loading}>
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <p className={styles.signupText}>
          قبلاً ثبت‌نام کرده‌اید؟ <a href="/login">وارد شوید</a>
        </p>
      </div>
    </div>
  );
}