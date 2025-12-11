// NotificationsTab.js
import React from 'react';
import { Bell } from 'lucide-react';
// ... بقیه کد مشابه فایل قبلی ...

export default function NotificationsTab() {
    // این کامپوننت نیازی به "use client" ندارد.
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center py-20 animate-fadeIn">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-800">تنظیمات اعلانات</h3>
            <p className="text-gray-500 mt-2">این بخش به زودی اضافه خواهد شد.</p>
        </div>
    );
}