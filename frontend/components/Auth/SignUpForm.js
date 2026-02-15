"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "./SignUpForm.module.css";
import ParticlesBackground from "../LoginBackground/ParticlesBackground";
import { useAuth } from "@/context/AuthContext";
import OTPInput from "./OTPInput";
import { useRouter } from "next/navigation";
import { applyServerErrors } from "@/utils/formHelpers";
// ۱. تعریف قوانین اعتبارسنجی
const signUpSchema = z
  .object({
    username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
    email: z.string().email("فرمت ایمیل صحیح نیست"),
    password: z
      .string()
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
      .max(128, "رمز عبور باید حداکثر 128 کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const { authActionLoading, registerUser, verifyEmail } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false); // ۱. استیت موفقیت اضافه شد
  // استیت‌های مدیریت مرحله و اطلاعات کاربر
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [focusFields, setFocusFields] = useState({});
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const values = watch();

  // هندل کردن انیمیشن Label ها
  const handleFocus = (field) =>
    setFocusFields((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) =>
    setFocusFields((prev) => ({ ...prev, [field]: false }));

// مرحله اول: ثبت‌نام
const onSubmit = async (data) => {
  try {
    await registerUser(data.username, data.email, data.password, data.confirmPassword);
    setUserEmail(data.email);
    setStep(2);
  } catch (error) {
    // فقط در یک خط، تمام ارورها رو ست کن!
    applyServerErrors(error, setError);
  }
};

// مرحله دوم: تایید OTP
const handleVerifyOTP = async (code) => {
  try {
    await verifyEmail(code);
    setIsSuccess(true);
    setTimeout(() => { router.push("/"); }, 3000);
  } catch (error) {
    // برای OTP هم از همون تابع استفاده کن (ارور رو روی فیلد otp یا code ست می‌کنه)
    applyServerErrors(error, setError);
    
    // اگر فیلد ارور برنگشت و خواستی دستی ست کنی:
    if (error.type === "general_error") {
       setError("otp", { message: error.message });
    }
  }
};

  return (
    <div className={styles.container}>
      <ParticlesBackground />

      <div className={styles.formContainer}>
        {/* بخش نمایش موفقیت نهایی */}
        {isSuccess ? (
          <div className={styles.successWrapper}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>خوش آمدی، دانیال عزیز!</h2>
            <p className={styles.successText}>
              ایمیل تو با موفقیت تایید شد. در حال انتقال به صفحه اصلی...
            </p>
            <div className={styles.miniLoader}></div>
          </div>
        ) : (
          <>
            <h1 className={styles.formTitle}>
              {step === 1 ? "ثبت‌نام" : "تایید ایمیل"}
            </h1>
            <div className={styles.formDivider}></div>

            {step === 1 ? (
              <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className={styles.formGroup}>
                  <label
                    className={`${styles.formLabel} ${focusFields.username || values.username ? styles.floating : ""}`}
                  >
                    نام کاربری
                  </label>
                  <input
                    {...register("username")}
                    onFocus={() => handleFocus("username")}
                    onBlur={() => handleBlur("username")}
                    className={`${styles.formInput} ${errors.username ? styles.inputError : ""}`}
                    dir="ltr"
                  />
                  {errors.username && (
                    <span className={styles.errorMessage}>
                      {errors.username.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label
                    className={`${styles.formLabel} ${focusFields.email || values.email ? styles.floating : ""}`}
                  >
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
                  {errors.email && (
                    <span className={styles.errorMessage}>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label
                    className={`${styles.formLabel} ${focusFields.password || values.password ? styles.floating : ""}`}
                  >
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
                  {errors.password && (
                    <span className={styles.errorMessage}>
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label
                    className={`${styles.formLabel} ${focusFields.confirmPassword || values.confirmPassword ? styles.floating : ""}`}
                  >
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
                  {errors.confirmPassword && (
                    <span className={styles.errorMessage}>
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                {errors.root && (
                  <div
                    className={styles.errorMessage}
                    style={{ textAlign: "center", marginBottom: "10px" }}
                  >
                    {errors.root.message}
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.formSubmitBtn}
                  disabled={authActionLoading}
                >
                  {authActionLoading
                    ? "در حال ارسال..."
                    : "ثبت‌نام و دریافت کد"}
                </button>
              </form>
            ) : (
              <OTPInput
                email={userEmail}
                onComplete={handleVerifyOTP}
                onBack={() => setStep(1)}
                serverError={errors.code?.message}
              />
            )}

            <p className={styles.signupText}>
              قبلاً ثبت‌نام کرده‌اید؟ <a href="/login">وارد شوید</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
