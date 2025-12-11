"use client"
// Sidebar.js
import React from 'react';
import { User, Lock, Bell, LogOut } from 'lucide-react';
// ... بقیه کد مشابه فایل قبلی ...

const sidebarItems = [
  { id: 'general', label: 'اطلاعات حساب', icon: User },
  { id: 'security', label: 'امنیت و رمز عبور', icon: Lock },
  { id: 'notifications', label: 'اعلانات', icon: Bell },
];

export default function Sidebar({ activeTab, setActiveTab, onLogoutClick, firstName, lastName }) {
  // این کامپوننت نیاز به "use client" دارد چون رویدادهای onClick را مدیریت می‌کند.
  return (
    <aside className="w-full md:w-64 flex-shrink-0 ">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden fixed top-26 w-11/12 md:w-64">
        
        {/* کارت کاربر */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {firstName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">{firstName}</p>
              <p className="text-xs text-gray-500 mt-0.5">کاربر معمولی</p>
            </div>
          </div>
        </div>

        {/* منوی ناوبری */}
        <nav className="p-2 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          
          {/* دکمه خروج از حساب */}
          <div className="pt-2 mt-2 border-t border-gray-100">
            <button 
              onClick={onLogoutClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-red-500 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={18} />
              خروج از حساب
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}