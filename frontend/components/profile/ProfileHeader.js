import React from 'react';
import { Camera } from 'lucide-react';

export default function ProfileHeader({ firstName }) {
  return (
    <div className="bg-surface/50 backdrop-blur-lg border border-border p-6 rounded-2xl">
      <h2 className="text-lg font-bold text-text-main mb-4 border-b border-border pb-3">عکس پروفایل</h2>
      <div className="flex items-center gap-6">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-surface border-4 border-border shadow-md overflow-hidden">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName || 'default'}`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" size={28} />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-text-main">تغییر تصویر</h3>
          <p className="text-sm text-text-faded mt-1 mb-3">فایل‌های JPG یا PNG، حداکثر 2 مگابایت</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-surface border border-border text-text-main rounded-lg text-sm hover:bg-border transition-colors">آپلود عکس</button>
            <button className="px-4 py-2 text-red-400 text-sm hover:bg-red-500/10 rounded-lg transition-colors">حذف</button>
          </div>
        </div>
      </div>
    </div>
  );
}
