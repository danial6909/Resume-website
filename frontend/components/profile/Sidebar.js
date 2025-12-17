"use client"

import React from 'react';
import { User, Lock, Bell, LogOut } from 'lucide-react';

const sidebarItems = [
  { id: 'general', label: 'اطلاعات حساب', icon: User },
  { id: 'security', label: 'امنیت', icon: Lock },
  { id: 'notifications', label: 'اعلانات', icon: Bell },
];

export default function Sidebar({ activeTab, setActiveTab, onLogoutClick, firstName }) {
  return (
    // ✨ تغییرات در این خط اعمال شده است
    <aside className="w-full md:w-64 flex-shrink-0 md: md:top-8 self-start">
      {/* کلاس sticky و top-8 از اینجا حذف شده است */}
      <div className="bg-surface/50 backdrop-blur-lg border border-border rounded-2xl overflow-hidden fixed top-24 w-11/12 md:w-64 ">
     
        {/* User Card */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-accent to-secondary-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {firstName ? firstName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="font-bold text-base text-text-main">{firstName || "نام کاربری"}</p>
              <p className="text-xs text-text-faded mt-0.5">کاربر معمولی</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative
                ${activeTab === item.id 
                  ? 'bg-primary-accent/10 text-primary-accent' 
                  : 'text-text-faded hover:bg-surface/80 hover:text-text-main'}
              `}
            >
              {activeTab === item.id && <div className="absolute left-0 w-1 h-6 bg-primary-accent rounded-r-full"></div>}
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
          
          {/* Logout Button */}
          <div className="pt-2 mt-2 border-t border-border">
            <button 
              onClick={onLogoutClick}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={20} />
              <span>خروج از حساب</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
