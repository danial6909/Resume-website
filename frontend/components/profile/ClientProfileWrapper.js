"use client"
// ClientProfileWrapper.js
import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import ProfileHeader from './ProfileHeader';
import GeneralInfoForm from './GeneralInfoForm';
import ChangePasswordForm from './ChangePasswordForm';
import NotificationsTab from './NotificationsTab';
import LogoutModal from './LogoutModal';

export default function ClientProfileWrapper({ initialData }) {
    const [activeTab, setActiveTab] = useState('general');
    const [showPassword, setShowPassword] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        ...initialData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // شبیه‌سازی درخواست به سرور
        setTimeout(() => {
            setIsLoading(false);
            if (activeTab === 'general') {
                 setMessage({ type: 'success', text: 'اطلاعات پروفایل شما با موفقیت به‌روزرسانی شد.' });
            } 
            else if (activeTab === 'security') {
                setMessage({ type: 'success', text: 'تنظیمات امنیتی و اطلاعات شناسایی با موفقیت تغییر کرد.' });
            }
            
            setTimeout(() => setMessage(null), 4000); // زمان نمایش پیام طولانی‌تر شد
        }, 1500);
    };

    const handleLogoutConfirm = () => {
        console.log("خروج از حساب...");
        setIsLogoutModalOpen(false);
        alert("شما با موفقیت از حساب کاربری خارج شدید.");
    };

    return (
        <div className="  m-7 px-4 mt-8">
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
            />

            <div className="flex flex-col md:flex-row gap-8"> {/* فاصله بین سایدبار و محتوا بیشتر شد */}
                
                {/* سایدبار (ثابت) */}
                <Sidebar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    onLogoutClick={() => setIsLogoutModalOpen(true)}
                    firstName={formData.firstName}
                    lastName={formData.lastName}
                />

                <main className="flex-1">
                    
                    {/* پیام موفقیت/خطا */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-fadeIn border-l-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-500' : 'bg-red-50 text-red-700 border-red-500'}`}>
                            {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                            <p className="text-sm font-semibold">{message.text}</p>
                        </div>
                    )}

                    {/* رندر محتوای تب فعال */}
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-fadeIn"> {/* فاصله بین کامپوننت‌ها بیشتر شد */}
                            <ProfileHeader firstName={formData.firstName} />
                            <GeneralInfoForm 
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleSave={handleSave}
                                isLoading={isLoading}
                            />
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-fadeIn">
                            <ChangePasswordForm 
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleSave={handleSave}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                        </div>
                    )}
                    
                    {activeTab === 'notifications' && <NotificationsTab />}
                </main>
            </div>
        </div>
    );
}