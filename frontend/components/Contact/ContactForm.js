"use client";
import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react"; // لودر برای زیبایی بیشتر
import NebulaInput from "../NebulaInput";
import PrimaryButton from "./PrimaryButton"; // وارد کردن کامپوننت جدید
import { motion } from "framer-motion";

const ContactForm = ({ row , padding , width }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      console.log("ارسال داده‌ها به بک‌اند:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setStatus("success");
      setFormData({ firstname: "", email: "", message: "" });
      
      // بعد از ۵ ثانیه پیام موفقیت غیب بشه
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <NebulaInput
          label="نام"
          id="fname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <NebulaInput
          label="ایمیل"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <NebulaInput
        label="پیام شما..."
        id="message"
        name="message"
        type="textarea"
        rows={row || 2}
        value={formData.message}
        onChange={handleChange}
      />
      
      {/* استفاده از کامپوننت جدید دکمه */}
      <PrimaryButton
        type="submit"
        disabled={status === "loading"}
        width={width ||" w-full" }       // می‌تونی اینجا ابعاد رو عوض کنی
        padding={padding ? `p-${padding}` : "p-3"}         // پدینگ دلخواه
      >
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            در حال ارسال...
          </>
        ) : (
          <>
            ارسال پیام
            <Send size={18} className="group-hover:rotate-12 transition-transform" />
          </>
        )}
      </PrimaryButton>

      {status === "success" && (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-green-500 text-[11px] text-center mt-2 font-bold"
        >
          پیام شما با موفقیت دریافت شد!
        </motion.p>
      )}
    </form>
  );
};

export default ContactForm;