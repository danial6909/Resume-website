"use client";
import React from "react";
import { Save, User } from "lucide-react";

export default function GeneralInfoForm({ formData, handleInputChange, handleSave, isLoading }) {
  return (
    <form
      onSubmit={handleSave}
      className="bg-surface/50 backdrop-blur-lg border border-border p-8 rounded-2xl shadow-2xl shadow-black/20 transition-all duration-300 hover:shadow-primary-accent/10"
    >
      <h2 className="text-xl font-extrabold text-text-main mb-6 pb-4 border-b border-border flex items-center gap-3">
        <User className="text-primary-accent" size={22} />
        اطلاعات پایه
      </h2>
      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-faded block">
            نام کامل (جهت نمایش)
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-surface/70 border border-border text-text-main focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none transition duration-200"
          />
        </div>
        
        {/* Biography */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-faded block">
            درباره من (بیوگرافی)
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="5"
            className="w-full px-4 py-3 rounded-xl bg-surface/70 border border-border text-text-main focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none transition resize-none"
            placeholder="کمی درباره خودتان بنویسید..."
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end pt-5 border-t border-border">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-primary-accent to-green-500 text-white px-8 py-3 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-accent/20 hover:shadow-primary-accent/40 duration-300 transform hover:scale-105"
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
