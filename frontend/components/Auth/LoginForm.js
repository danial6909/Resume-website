// components/LoginForm/LoginForm.js
"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import ParticlesBackground from "../LoginBackground/ParticlesBackground";
import { useAuth } from "@/context/AuthContext";
import Loader from "../Loader/Loader";

export default function LoginForm() {
  const { login, loading } = useAuth();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={styles.container}>
      {/* Canvas ذرات */}
      <ParticlesBackground />

      <div className={styles.formContainer}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <h1 className={styles.formTitle}>خوش آمدید</h1>
            <div className={styles.formDivider}></div>
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* ایمیل */}
              <div className={styles.formGroup}>
                <label
                  htmlFor="email"
                  className={`${styles.formLabel} ${
                    isEmailFocused || email ? styles.floating : ""
                  }`}
                >
                  نام کاربری
                </label>
                <input
                  id="email"
                  type="text"
                  className={styles.formInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  //   placeholder="you@company.com"
                  required
                  dir="ltr" // فقط اینپوت چپ‌چین
                />
              </div>

              {/* رمز عبور */}
              <div className={styles.formGroup}>
                <label
                  htmlFor="password"
                  className={`${styles.formLabel} ${
                    isPasswordFocused || password ? styles.floating : ""
                  }`}
                >
                  رمز عبور
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.formInput}
                  value={String(password)}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  placeholder="••••••••"
                  required
                  dir="ltr"
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.remember}>
                  <input type="checkbox" />
                  مرا به خاطر بسپار
                </label>
                <a href="/forgetPassword" className={styles.forgot}>
                  رمز عبور را فراموش کرده‌ام؟
                </a>
              </div>

              <button type="submit" className={styles.formSubmitBtn}>
                ورود
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
