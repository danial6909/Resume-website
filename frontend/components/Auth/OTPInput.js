"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./OTPInput.module.css";

export default function OTPInput({
  length = 6,
  email,
  onComplete,
  onBack,
  serverError,
}) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const { resendOTP, authActionLoading } = useAuth();

  // مدیریت تایمر
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.join("").length === length) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = async () => {
    if (!canResend || authActionLoading) return; // جلوگیری از کلیک اسپم
    await resendOTP(email);
    setTimer(120);
    setCanResend(false);
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text");
    if (!/^\d+$/.test(data)) return; // اگر عدد نبود کاری نکن

    const pasteData = data.slice(0, length).split("");
    const newOtp = [...otp];

    pasteData.forEach((char, index) => {
      newOtp[index] = char;
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });

    setOtp(newOtp);

    // فوکوس بره روی آخرین باکس پر شده
    const lastIndex = Math.min(pasteData.length, length - 1);
    inputRefs.current[lastIndex].focus();

    // اگر کامل بود، تابع اتمام رو صدا بزن
    if (newOtp.join("").length === length) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div className={styles.otpStepContainer}>
      <p className={styles.otpHint}>
        کد تایید به ایمیل <strong>{email}</strong> ارسال شد.
      </p>

      <div className={styles.otpWrapper}>
        {otp.map((data, index) => (
          // در بخش return، تگ input را اینگونه اصلاح کن:
          <input
            key={index}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code" // کمک به مرورگر برای تشخیص OTP
            disabled={authActionLoading}
            ref={(el) => (inputRefs.current[index] = el)}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`${styles.otpDigitInput} ${serverError ? styles.inputError : ""}`}
            maxLength={1}
            onPaste={handlePaste}
            /* مقدار dir را حتما ltr بگذار */
            dir="ltr"
          />
        ))}
      </div>

      {/* نمایش ارور اینجا اضافه شد */}
      {serverError && (
        <p
          className={styles.errorMessage}
          style={{ marginBottom: "15px", textAlign: "center" }}
        >
          {serverError}
        </p>
      )}

      <div className={styles.resendSection}>
        {canResend ? (
          <p>
            کد را دریافت نکردید؟{" "}
            <button
              onClick={handleResend}
              className={styles.resendBtn}
              type="button"
              disabled={authActionLoading}
            >
              {authActionLoading ? "در حال ارسال..." : "ارسال مجدد"}
            </button>
          </p>
        ) : (
          <p>
            ارسال مجدد کد تا <span className={styles.timerText}>{timer}</span>{" "}
            ثانیه دیگر
          </p>
        )}
      </div>

      <button onClick={onBack} className={styles.backBtn} type="button">
        <span>←</span> ویرایش اطلاعات / بازگشت
      </button>
    </div>
  );
}
