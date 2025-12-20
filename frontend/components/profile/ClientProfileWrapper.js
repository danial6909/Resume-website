"use client";

import React, { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import GeneralInfoForm from "./GeneralInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";
import NotificationsTab from "./NotificationsTab";
import LogoutModal from "./LogoutModal";
import axiosInstance from "@/utils/axiosInstance";

// کامپوننت برای افکت نورانی پس‌زمینه
const AuroraBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-accent/10 rounded-full filter blur-3xl animate-blob"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-accent/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
  </div>
);

export default function ClientProfileWrapper({ initialData }) {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ...initialData,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneralSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      const dataToSend = {
        image: "salam", // LATER: Implement image upload
        full_name: formData.firstName,
        bio: formData.bio,
      };
      await axiosInstance.patch("/profile/", dataToSend);
      setMessage({
        type: "success",
        text: "اطلاعات پروفایل شما با موفقیت به‌روزرسانی شد.",
      });
    } catch (error) {
      console.error("General Save Error:", error);
      setMessage({
        type: "error",
        text: error.message || "خطای شبکه یا سرور.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleSecuritySave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("رمز عبور جدید و تکرار آن مطابقت ندارند.");
      }
      const dataToSend = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
      };
      // Replace with your API endpoint
      const response = await fetch("/api/user/profile/security", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "خطا در تغییر اطلاعات امنیتی.");
      }
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setMessage({
        type: "success",
        text: "تنظیمات امنیتی شما با موفقیت تغییر کرد.",
      });
    } catch (error) {
      console.error("Security Save Error:", error);
      setMessage({
        type: "error",
        text: error.message || "خطای شبکه یا سرور.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleLogoutConfirm = () => {
    console.log("خروج از حساب...");
    setIsLogoutModalOpen(false);
    alert("شما با موفقیت از حساب کاربری خارج شدید.");
  };

  return (
    <div className="relative bg-background text-text-main min-h-screen p-2 sm:p-6 md:p-8 ">
      <AuroraBackground />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
      <div className="flex flex-col md:flex-row gap-8  mx-auto">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogoutClick={() => setIsLogoutModalOpen(true)}
          firstName={formData.firstName || "کاربر"}
        />
        <main className="flex-1 space-y-8">
          {message && (
            <div
              className={`p-4 rounded-xl flex items-center gap-3 animate-fadeIn border-l-4 ${
                message.type === "success"
                  ? "bg-green-900/50 text-green-300 border-green-500"
                  : "bg-red-900/50 text-red-300 border-red-500"
              }`}
            >
              {message.type === "success" ? (
                <Check size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <p className="text-sm font-semibold">{message.text}</p>
            </div>
          )}

          <div className="animate-fadeInUp">
            {activeTab === "general" && (
              <div className="space-y-8">
                <ProfileHeader firstName={formData.firstName} />
                <GeneralInfoForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSave={handleGeneralSave}
                  isLoading={isLoading}
                />
              </div>
            )}
            {activeTab === "security" && (
              <ChangePasswordForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSecuritySave}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isLoading={isLoading}
              />
            )}
            {activeTab === "notifications" && <NotificationsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
