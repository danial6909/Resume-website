// ProfileHeader.js
import React from 'react';
import { Camera } from 'lucide-react';
// ... بقیه کد مشابه فایل قبلی ...

export default function ProfileHeader({ firstName }) {
  // این کامپوننت نیازی به "use client" ندارد.
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">عکس پروفایل</h2>
      <div className="flex items-center gap-6">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* این overlay و دکمه‌ها قابلیت تعامل واقعی ندارند و ایستا هستند. */}
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" size={24} />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-700">تغییر تصویر</h3>
          <p className="text-sm text-gray-500 mt-1 mb-3">فایل‌های JPG یا PNG، حداکثر 2 مگابایت</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition">آپلود عکس</button>
            <button className="px-4 py-1.5 text-red-500 text-sm hover:bg-red-50 rounded-lg transition">حذف</button>
          </div>
        </div>
      </div>
    </div>
  );
}