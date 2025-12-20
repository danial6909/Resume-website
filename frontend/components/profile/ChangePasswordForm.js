"use client";
import React from "react";
import { Eye, EyeOff, Mail, Smartphone, User, ShieldCheck, Save } from "lucide-react";

export default function ChangePasswordForm({ formData, handleInputChange, handleSave, showPassword, setShowPassword, isLoading }) {
  return (
    <form
      onSubmit={handleSave}
      className="bg-surface/50 backdrop-blur-lg border border-border p-8 rounded-2xl shadow-2xl shadow-black/20 transition-all duration-300 hover:shadow-secondary-accent/10"
    >
      {/* Section 1: Identity & Contact */}
      <h2 className="text-xl font-extrabold text-text-main mb-8 pb-4 border-b border-border flex items-center gap-3">
        <ShieldCheck className="text-secondary-accent" size={22} />
        اطلاعات شناسایی و تماس
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-faded block">نام کاربری</label>
          <div className="relative">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface/70 border border-border text-text-main focus:ring-2 focus:ring-secondary-accent focus:border-secondary-accent outline-none transition"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-faded block">آدرس ایمیل</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pr-10 pl-4 py-3 rounded-xl bg-surface/70 border border-border text-text-main focus:ring-2 focus:ring-secondary-accent focus:border-secondary-accent outline-none transition text-left"
              dir="ltr"
            />
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-text-faded block">شماره موبایل</label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pr-10 pl-4 py-3 rounded-xl bg-surface/70 border border-border text-text-main focus:ring-2 focus:ring-secondary-accent focus:border-secondary-accent outline-none transition text-left"
              dir="ltr"
            />
            <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          </div>
        </div>
      </div>

      {/* Section 2: Change Password */}
      <h2 className="text-xl font-extrabold text-text-main mb-6 pb-4 border-b border-border flex items-center gap-3">
        <ShieldCheck className="text-secondary-accent" size={22} />
        تغییر رمز عبور
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-text-faded block">رمز عبور فعلی</label>
                <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-surface/70 border border-border focus:ring-2 focus:ring-secondary-accent focus:border-secondary-accent outline-none transition" />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-text-faded block">رمز عبور جدید</label>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-surface/70 border border-border focus:ring-2 focus:ring-secondary-accent focus:border-secondary-accent outline-none transition" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faded hover:text-secondary-accent">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                 <p className="text-xs text-text-muted">حداقل ۸ کاراکتر شامل حروف و اعداد.</p>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-text-faded block">تکرار رمز عبور جدید</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-surface/70 border border-border focus:ring-2 focus:ring-secondary-accent focus:border-secondary-accent outline-none transition" />
            </div>
        </div>
      </div>

      <div className="flex justify-end pt-8 mt-8 border-t border-border">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-secondary-accent to-blue-600 text-white px-8 py-3 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-secondary-accent/20 hover:shadow-secondary-accent/40 duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save size={18} />
          )}
          <span className="font-bold">ذخیره تغییرات امنیتی</span>
        </button>
      </div>
    </form>
  );
}
