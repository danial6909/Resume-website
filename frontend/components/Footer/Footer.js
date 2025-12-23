"use client";
import React from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import NebulaInput from "../NebulaInput";
const Footer = () => {
  return (
    <footer
      className="w-full bg-background border-t border-border py-10 px-4"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* بخش سمت راست: فرم تماس */}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              با ما در ارتباط باشید
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است.
            </p>
          </div>

          <div className="space-y-6">
            <ContactInfo
              icon={<MapPin className="text-primary-accent" />}
              title="آدرس ما"
              detail="تهران، خیابان آزادی، برج نوآوری"
            />
            <ContactInfo
              icon={<Phone className="text-primary-accent" />}
              title="شماره تماس"
              detail="۰۲۱-۱۲۳۴۵۶۷۸"
            />
            <ContactInfo
              icon={<Mail className="text-primary-accent" />}
              title="ایمیل"
              detail="info@example.com"
            />
          </div>
        </motion.div>
        {/* بخش سمت چپ: اطلاعات تماس */}

       {/* بخش فرم در فوتر */}
<motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  className="space-y-4" // فاصله بین المان‌ها
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <NebulaInput label="نام" id="fname" name="firstname" />
    <NebulaInput label="ایمیل" id="email" name="email" type="email" />
  </div>

  {/* اینپوت موضوع - حالا تمام عرض می‌شود */}
  <NebulaInput label="موضوع" id="subject" name="subject" />

  {/* تکست‌اریا پیام */}
  <NebulaInput 
    label="پیام شما..." 
    id="message" 
    name="message" 
    type="textarea" 
    rows="5" 
    className="resize-none" 
  />

  <button className="flex items-center gap-2 bg-transparent border-2 border-primary-accent text-primary-accent px-8 py-3 rounded-lg hover:bg-primary-accent hover:text-white transition-all duration-300 font-bold group cursor-pointer w-full md:w-auto justify-center">
    ارسال پیام
    <Send size={18} className="group-hover:translate-x-[-4px] transition-transform" />
  </button>
</motion.div>
      </div>

      <div className="mt-10 pt-8 border-t border-border text-center text-muted-foreground text-sm">
        <p>
          © {new Date().getFullYear()} تمام حقوق محفوظ است | طراحی شده توسط
          دانیال
        </p>
      </div>
    </footer>
  );
};

// کامپوننت کمکی برای ردیف‌های تماس
const ContactInfo = ({ icon, title, detail }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-primary-accent/10 rounded-full">{icon}</div>
    <div>
      <h4 className="text-foreground font-bold">{title}</h4>
      <p className="text-muted-foreground text-sm mt-1">{detail}</p>
    </div>
  </div>
);

export default Footer;
