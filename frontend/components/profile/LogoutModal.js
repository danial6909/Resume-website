"use client"
// LogoutModal.js
import React from 'react';
import { AlertTriangle, LogOut, X } from 'lucide-react';
// ... بقیه کد مشابه فایل قبلی ...
export default function LogoutModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    // ... (بقیه پیاده سازی مودال)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-scaleUp">
                
                {/* هدر مودال */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <AlertTriangle className="text-red-500" size={20} />
                        تأیید خروج از حساب
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X size={24} />
                    </button>
                </div>

                {/* محتوای مودال */}
                <div className="p-6">
                    <p className="text-gray-600 mb-6">
                        آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟ این عمل، شما را از تمام دستگاه‌ها خارج می‌کند.
                    </p>
                    
                    {/* دکمه‌ها */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                        >
                            انصراف
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 text-sm font-medium"
                        >
                            <LogOut size={18} />
                            خروج
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}