// components/ForgotPasswordForm/ForgotPasswordForm.js
'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './ForgotPasswordForm.module.css';
import ParticlesBackground from "../LoginBackground/ParticlesBackground";

export default function ForgotPasswordForm() {
 
  const [step, setStep] = useState('email'); // 'email' | 'reset'
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);



  // مرحله ۱: ارسال ایمیل
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('❌ لطفاً ایمیل خود را وارد کنید.');
      return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'در حال ارسال...';

    setTimeout(() => {
      alert(`✅ لینک بازنشانی رمز عبور به ${email} ارسال شد.\n(در این دمو، به صفحه تعیین رمز جدید منتقل می‌شوید)`);
      setStep('reset');
      btn.disabled = false;
      btn.textContent = 'ارسال مجدد لینک';
    }, 1000);
  };

  // مرحله ۲: تعیین رمز جدید
  const handleResetSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert('❌ رمز عبور باید حداقل ۶ کاراکتر باشد.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('❌ رمز عبور و تکرار آن یکسان نیستند.');
      return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'در حال ذخیره...';

    setTimeout(() => {
      alert('✅ رمز عبور شما با موفقیت تغییر کرد.\nاکنون می‌توانید وارد شوید.');
      // در واقعیت: redirect به /login
      setStep('email');
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      btn.disabled = false;
      btn.textContent = 'تغییر رمز عبور';
    }, 1000);
  };

  return (
    <div className={styles.container}>
      {/* Canvas ذرات */}
      <ParticlesBackground />

      <div className={styles.formContainer}>
        {step === 'email' ? (
          <>
            <h1 className={styles.formTitle}>بازیابی رمز عبور</h1>
            <div className={styles.formDivider}></div>
            <p className={styles.formHint}>
              لطفاً ایمیل خود را وارد کنید تا لینک بازنشانی برای شما ارسال شود.
            </p>

            <form className={styles.form} onSubmit={handleEmailSubmit}>
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

              <button type="submit" className={styles.formSubmitBtn}>
                ارسال لینک بازیابی
              </button>
            </form>

            <p className={styles.backLink}>
              <a href="/login">← بازگشت به صفحه ورود</a>
            </p>
          </>
        ) : (
          // مرحله دوم: تعیین رمز جدید
          <>
            <h1 className={styles.formTitle}>تعیین رمز جدید</h1>
            <div className={styles.formDivider}></div>
            <p className={styles.formHint}>
              لینک بازنشانی را در ایمیل خود بررسی کرده‌اید. حالا رمز جدید خود را وارد کنید.
            </p>

            <form className={styles.form} onSubmit={handleResetSubmit}>
              <div className={styles.formGroup}>
                <label
                  htmlFor="newPassword"
                  className={`${styles.formLabel} ${isPasswordFocused || newPassword ? styles.floating : ''}`}
                >
                  رمز عبور جدید
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className={styles.formInput}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  placeholder="••••••••"
                  required
                  dir="ltr"
                />
              </div>

              <div className={styles.formGroup}>
                <label
                  htmlFor="confirmPassword"
                  className={`${styles.formLabel} ${isConfirmPasswordFocused || confirmPassword ? styles.floating : ''}`}
                >
                  تکرار رمز عبور جدید
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

              <button type="submit" className={styles.formSubmitBtn}>
                تغییر رمز عبور
              </button>
            </form>

            <p className={styles.backLink}>
              <a href="#" onClick={(e) => { e.preventDefault(); setStep('email'); }}>
                ← ارسال مجدد لینک
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}