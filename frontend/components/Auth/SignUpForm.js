// components/SignUpForm/SignUpForm.js
'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './SignUpForm.module.css';
import ParticlesBackground from "../LoginBackground/ParticlesBackground";

export default function SignUpForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();

    // اعتبارسنجی ساده
    if (password !== confirmPassword) {
      alert('❌ رمز عبور و تکرار آن یکسان نیستند.');
      return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'در حال ثبت‌نام...';

    setTimeout(() => {
      alert('✅ ثبت‌نام با موفقیت انجام شد! ایمیل تأیید ارسال گردید.');
      btn.disabled = false;
      btn.textContent = 'ثبت‌نام';
    }, 1200);
  };

  return (
    <div className={styles.container}>
      {/* Canvas ذرات */}
      <ParticlesBackground />

      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>ثبت‌نام  </h1>
        <div className={styles.formDivider}></div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* نام */}
          <div className={styles.formGroup}>
            <label
              htmlFor="name"
              className={`${styles.formLabel} ${isNameFocused || name ? styles.floating : ''}`}
            >
              نام کاربری
            </label>
            <input
              id="name"
              type="text"
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
            //   placeholder="علی احمدی"
              required
              dir="ltr"
            />
          </div>

          {/* ایمیل */}
          <div className={styles.formGroup}>
            <label
              htmlFor="email"
              className={`${styles.formLabel} ${isEmailFocused || email ? styles.floating : ''}`}
            >
              ایمیل 
            </label>
            <input
              id="email"
              type="email"
              className={styles.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              placeholder="you@company.com"
              required
              dir="ltr"
            />
          </div>

          {/* رمز عبور */}
          <div className={styles.formGroup}>
            <label
              htmlFor="password"
              className={`${styles.formLabel} ${isPasswordFocused || password ? styles.floating : ''}`}
            >
              رمز عبور
            </label>
            <input
              id="password"
              type="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              placeholder="••••••••"
              required
              dir="ltr"
            />
          </div>

          {/* تکرار رمز عبور */}
          <div className={styles.formGroup}>
            <label
              htmlFor="confirmPassword"
              className={`${styles.formLabel} ${isConfirmPasswordFocused || confirmPassword ? styles.floating : ''}`}
            >
              تکرار رمز عبور
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.formInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
              placeholder="••••••••"
              required
              dir="ltr"
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.remember}>
              <input type="checkbox" required />
              <span>شرایط و قوانین را می‌پذیرم</span>
            </label>
          </div>

          <button type="submit" className={styles.formSubmitBtn}>
            ثبت‌نام
          </button>
        </form>

        <p className={styles.signupText}>
          قبلاً ثبت‌نام کرده‌اید؟ <a href="/login">وارد شوید</a>
        </p>
      </div>
    </div>
  );
}