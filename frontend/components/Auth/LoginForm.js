// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link"; // حتما از این استفاده کن که صفحه رفرش نشود
// import styles from "./LoginForm.module.css";
// import ParticlesBackground from "../LoginBackground/ParticlesBackground";
// import { useAuth } from "@/context/AuthContext";

// // ۱. تنظیم قوانین اعتبار سنجی
// const loginSchema = z.object({
//   username: z
//     .string()
//     .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
//     .max(20, "نام کاربری خیلی طولانی است"),
//   password: z
//     .string()
//     .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد") 
//     .max(128, "رمز عبور باید حداکثر 128 کاراکترباشد"),
// });

// export default function LoginForm() {
//   // استفاده از مقادیر کانتکست (هوک یکپارچه دانیال)
//   const { login, authActionLoading } = useAuth();

//   // استیت فوکوس برای لبل‌ها
//   const [focusFields, setFocusFields] = useState({});

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setError,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { username: "", password: "" },
//   });

//   const values = watch();

//   const handleFocus = (field) =>
//     setFocusFields((prev) => ({ ...prev, [field]: true }));
//   const handleBlur = (field) =>
//     setFocusFields((prev) => ({ ...prev, [field]: false }));

//   const onSubmit = async (data) => {
//     try {
//       await login(data.username, data.password);
//     } catch (error) {
//       if (error.response && error.response.data) {
//         // استخراج خطاها (معمولاً در فیلد errors یا مستقیماً در data هستند)
//         const serverErrors = error.response.data.errors || error.response.data;
//         console.log(serverErrors);

//         if (typeof serverErrors === "object") {
//           Object.keys(serverErrors).forEach((field) => {
//             const errorData = serverErrors[field];
//             let message = "";

//             // تبدیل خطاها به فرمت لیست نقطه‌دار (مشابه فایل رجیستر)
//             if (Array.isArray(errorData)) {
//               message = errorData.map((msg) => `• ${msg}`).join("\n");
//             } else {
//               message = `• ${errorData}`;
//             }

//             // تنظیم خطا روی فیلد مربوطه یا روی root اگر فیلد نامشخص بود
//             setError(field, {
//               type: "server",
//               message: message,
//             });
//           });
//         }
//       } else {
//         setError("root", { message: "خطا در اتصال به شبکه" });
//       }
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <ParticlesBackground />

//       <div className={styles.formContainer}>
//         {/* لینک بازگشت به خانه */}
//         <Link href="/" className={styles.backLink}>
//           <ArrowRight size={18} />
//           <span>بازگشت به سایت</span>
//         </Link>
//         <h1 className={styles.formTitle}>خوش آمدید</h1>
//         <div className={styles.formDivider}></div>

//         <form
//           className={styles.form}
//           onSubmit={handleSubmit(onSubmit)}
//           noValidate
//         >
//           {/* فیلد نام کاربری */}
//           <div className={styles.formGroup}>
//             <label
//               className={`${styles.formLabel} ${
//                 focusFields.username || values.username ? styles.floating : ""
//               }`}
//             >
//               نام کاربری
//             </label>
//             <input
//               type="text"
//               {...register("username")}
//               onFocus={() => handleFocus("username")}
//               onBlur={() => handleBlur("username")}
//               spellCheck="false"
//               className={`${styles.formInput} ${errors.username ? styles.inputError : ""}`}
//               dir="ltr"
//             />
//             {errors.username && (
//               <span className={styles.errorMessage}>
//                 {errors.username.message}
//               </span>
//             )}
//           </div>

//           {/* فیلد رمز عبور */}
//           <div className={styles.formGroup}>
//             <label
//               className={`${styles.formLabel} ${
//                 focusFields.password || values.password ? styles.floating : ""
//               }`}
//             >
//               رمز عبور
//             </label>
//             <input
//               type="password"
//               {...register("password")}
//               onFocus={() => handleFocus("password")}
//               onBlur={() => handleBlur("password")}
//               className={`${styles.formInput} ${errors.password ? styles.inputError : ""}`}
//               placeholder={focusFields.password ? "" : "••••••••"}
//               dir="ltr"
//             />
//             {errors.password && (
//               <span className={styles.errorMessage}>
//                 {errors.password.message}
//               </span>
//             )}
//           </div>

//           {/* پیام خطای کلی (Root) */}
//           {errors.root && (
//             <div
//               className={styles.errorMessage}
//               style={{
//                 position: "static",
//                 marginBottom: "10px",
//                 textAlign: "center",
//               }}
//             >
//               {errors.root.message}
//             </div>
//           )}

//           <div className={styles.formRow}>
           
            
//             <a href="/forgetPassword" className={styles.forgot}>
//               فراموشی رمز عبور
//             </a>
//           </div>

//           <button
//             type="submit"
//             className={styles.formSubmitBtn}
//             disabled={authActionLoading}
//           >
//             {authActionLoading ? "در حال ورود..." : "ورود به حساب"}
//           </button>
//         </form>

//         <p className={styles.signupText}>
//           حساب کاربری ندارید؟ <a href="/register">ثبت‌نام کنید</a>
//         </p>
//       </div>
//     </div>
//   );
// }









"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./LoginForm.module.css";
import ParticlesBackground from "../LoginBackground/ParticlesBackground";
import { useAuth } from "@/context/AuthContext";
import OTPInput from "./OTPInput";
import { useRouter } from "next/navigation";

// ۱. تنظیم قوانین اعتبار سنجی
const loginSchema = z.object({
  username: z
    .string()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
    .max(20, "نام کاربری خیلی طولانی است"),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد") 
    .max(128, "رمز عبور باید حداکثر 128 کاراکترباشد"),
});

export default function LoginForm() {
  // استفاده از مقادیر کانتکست (هوک یکپارچه دانیال)
  const { login, authActionLoading, verifyEmail } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  // استیت فوکوس برای لبل‌ها
  const [focusFields, setFocusFields] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const values = watch();

  const handleFocus = (field) =>
    setFocusFields((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) =>
    setFocusFields((prev) => ({ ...prev, [field]: false }));

  const onSubmit = async (data) => {
    try {
      // ۱. خروجی تابع رو توی یک متغیر ذخیره کن
      const result = await login(data.username, data.password);
      
      // ۲. حالا نتیجه رو لاگ بگیر تا دیتای ارسالی بک‌اِند رو ببینی
      console.log("Response from Backend:", result);
      
      // فرض می‌کنیم بک‌اند ایمیل رو برمی‌گردونه یا از کانتکست می‌گیریم
      setUserEmail(result?.email || data.username); 
      setStep(2); // انتقال به مرحله تایید کد
    } catch (error) {
      if (error.response && error.response.data) {
        // استخراج خطاها (معمولاً در فیلد errors یا مستقیماً در data هستند)
        const serverErrors = error.response.data.errors || error.response.data;
        console.log(serverErrors);

        if (typeof serverErrors === "object") {
          Object.keys(serverErrors).forEach((field) => {
            const errorData = serverErrors[field];
            let message = "";

            // تبدیل خطاها به فرمت لیست نقطه‌دار (مشابه فایل رجیستر)
            if (Array.isArray(errorData)) {
              message = errorData.map((msg) => `• ${msg}`).join("\n");
            } else {
              message = `• ${errorData}`;
            }

            // تنظیم خطا روی فیلد مربوطه یا روی root اگر فیلد نامشخص بود
            setError(field, {
              type: "server",
              message: message,
            });
          });
        }
      } else {
        setError("root", { message: "خطا در اتصال به شبکه" });
      }
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      await verifyEmail(otp);
      setIsSuccess(true);

      // ریدایرکت بعد از چند ثانیه برای اینکه کاربر پیام رو ببینه
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      setError("otp", { message: "کد وارد شده صحیح نیست یا منقضی شده است" });
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
              ورود شما با موفقیت انجام شد. در حال انتقال به صفحه اصلی...
            </p>
            <div className={styles.miniLoader}></div>
          </div>
        ) : (
          <>
            {/* لینک بازگشت به خانه */}
            <Link href="/" className={styles.backLink}>
              <ArrowRight size={18} />
              <span>بازگشت به سایت</span>
            </Link>
            
            <h1 className={styles.formTitle}>
              {step === 1 ? "خوش آمدید" : "تایید ایمیل"}
            </h1>
            <div className={styles.formDivider}></div>

            {step === 1 ? (
              <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* فیلد نام کاربری */}
                <div className={styles.formGroup}>
                  <label
                    className={`${styles.formLabel} ${
                      focusFields.username || values.username ? styles.floating : ""
                    }`}
                  >
                    نام کاربری
                  </label>
                  <input
                    type="text"
                    {...register("username")}
                    onFocus={() => handleFocus("username")}
                    onBlur={() => handleBlur("username")}
                    spellCheck="false"
                    className={`${styles.formInput} ${errors.username ? styles.inputError : ""}`}
                    dir="ltr"
                  />
                  {errors.username && (
                    <span className={styles.errorMessage}>
                      {errors.username.message}
                    </span>
                  )}
                </div>

                {/* فیلد رمز عبور */}
                <div className={styles.formGroup}>
                  <label
                    className={`${styles.formLabel} ${
                      focusFields.password || values.password ? styles.floating : ""
                    }`}
                  >
                    رمز عبور
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    className={`${styles.formInput} ${errors.password ? styles.inputError : ""}`}
                    placeholder={focusFields.password ? "" : "••••••••"}
                    dir="ltr"
                  />
                  {errors.password && (
                    <span className={styles.errorMessage}>
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* پیام خطای کلی (Root) */}
                {errors.root && (
                  <div
                    className={styles.errorMessage}
                    style={{
                      position: "static",
                      marginBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    {errors.root.message}
                  </div>
                )}

                <div className={styles.formRow}>
                  <a href="/forgetPassword" className={styles.forgot}>
                    فراموشی رمز عبور
                  </a>
                </div>

                <button
                  type="submit"
                  className={styles.formSubmitBtn}
                  disabled={authActionLoading}
                >
                  {authActionLoading ? "در حال ورود..." : "ورود به حساب"}
                </button>
              </form>
            ) : (
              <OTPInput
                email={userEmail}
                onComplete={handleVerifyOTP}
                onBack={() => setStep(1)}
                serverError={errors.otp?.message}
              />
            )}

            <p className={styles.signupText}>
              حساب کاربری ندارید؟ <a href="/register">ثبت‌نام کنید</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}