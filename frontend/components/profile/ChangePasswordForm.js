"use client";
// ChangePasswordForm.js
import React from "react";
import { Eye, EyeOff, Mail, Smartphone, User, ShieldCheck } from "lucide-react"; // آیکون ShieldCheck برای امنیت

export default function ChangePasswordForm({
  formData,
  handleInputChange,
  handleSave,
  showPassword,
  setShowPassword,
}) {
  return (
    <form
      onSubmit={handleSave}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl transition duration-300"
    >
      {/* بخش ۱: اطلاعات شناسایی و تماس */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-8 pb-3 border-b border-gray-100 flex items-center gap-2">
        <ShieldCheck className="text-red-500" size={20} />
        اطلاعات شناسایی و تماس
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* نام کاربری */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">
            نام کاربری
          </label>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition duration-200"
            />
            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* آدرس ایمیل */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">
            آدرس ایمیل
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition duration-200 text-left"
              dir="ltr"
            />
            <Mail
              className="absolute right-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* شماره موبایل */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">
            شماره موبایل
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition duration-200 text-left"
              dir="ltr"
            />
            <Smartphone
              className="absolute right-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>

      {/* بخش ۲: تغییر رمز عبور */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
        <ShieldCheck className="text-red-500" size={20} />
        تغییر رمز عبور
      </h2>

      <div className="max-w-md space-y-4">
        {/* رمز عبور فعلی */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">
            رمز عبور فعلی
          </label>
          <input
            type="password"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none transition duration-200"
          />
        </div>

        {/* رمز عبور جدید */}
        <div className="space-y-2 pt-2">
          <label className="text-sm font-semibold text-gray-700 block">
            رمز عبور جدید
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none transition duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-2.5 text-gray-400 hover:text-red-600 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            حداقل ۸ کاراکتر شامل حروف و اعداد.
          </p>
        </div>

        {/* تکرار رمز عبور جدید */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">
            تکرار رمز عبور جدید
          </label>
          <input
            type="password"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none transition duration-200"
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition w-full md:w-auto shadow-lg shadow-red-300 hover:shadow-xl hover:scale-[1.01] duration-300 font-bold"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </form>
  );
}
