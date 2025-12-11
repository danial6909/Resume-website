"use client";
// GeneralInfoForm.js
import React from "react";
import { Save, User } from "lucide-react"; // آیکون User برای نام

export default function GeneralInfoForm({
  formData,
  handleInputChange,
  handleSave,
  isLoading,
}) {
  // فیلدهای نام کاربری (lastName)، ایمیل و شماره موبایل حذف شدند.
  return (
    <form
      onSubmit={handleSave}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl transition duration-300"
    >
      <h2 className="text-xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
        <User className="text-blue-500" size={20} />
        اطلاعات پایه
      </h2>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* نام */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">
            نام کامل (جهت نمایش)
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition duration-200"
          />
        </div>
      </div>

      {/* بیوگرافی */}
      <div className="space-y-2 mb-10">
        <label className="text-sm font-semibold text-gray-700 block">
          درباره من (بیوگرافی)
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition resize-none"
          placeholder="کمی درباره خودتان بنویسید..."
        ></textarea>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-300 hover:shadow-xl hover:scale-[1.01] duration-300"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save size={18} />
          )}
          <span className="font-bold">ذخیره تغییرات</span>
        </button>
      </div>
    </form>
  );
}
