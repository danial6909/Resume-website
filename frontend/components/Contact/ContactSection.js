"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import TitleHeaderPages from "../TitleHeaderPages";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message)
      return alert("همه فیلدها الزامی هستند");

    setLoading(true);

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div
        className=" bg-background pt-10 px-6 mx-auto font-[vazir] max-w-7xl "
        dir="rtl"
      >
        {/* header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 ">
          <TitleHeaderPages title1="Contact" title2="تماس با " />
        </div>
      </div>

      <section
        dir="rtl"
        className="min-h-screen bg-background text-main px-6 pb-20"
      >
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-surface border border-border rounded-2xl p-10"
        >
          {/* Info */}
          <div className="space-y-8">
            <div>
              <p className="text-faded leading-relaxed">
                آماده پاسخگویی به سوالات شما هستیم. از طریق فرم یا اطلاعات زیر
                با ما در ارتباط باشید.
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-center gap-3">
                <Send className="text-primary-accent" size={18} />
                <a
                  href="https://t.me/dan6909"
                  target="_blank"
                  className="hover:text-primary-accent transition"
                >
                  پشتیبانی تلگرام
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-primary-accent" size={18} />
                <span>support@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-secondary-accent" size={18} />
                <span>+98 912 000 0000</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-primary-accent" size={18} />
                <span>تهران، ایران</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-secondary-accent" size={18} />
                <span>شنبه تا پنجشنبه | 9 تا 18</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-background border border-border rounded-xl p-4 text-center">
                <p className="text-primary-accent font-bold text-xl">24h</p>
                <p className="text-muted text-xs">زمان پاسخ</p>
              </div>
              <div className="bg-background border border-border rounded-xl p-4 text-center">
                <p className="text-secondary-accent font-bold text-xl">100%</p>
                <p className="text-muted text-xs">رضایت مشتری</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="نام"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary-accent outline-none"
              />
            </div>

            <div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ایمیل"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-secondary-accent outline-none"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="پیام شما"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary-accent outline-none"
              />
            </div>

            <button
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-accent to-secondary-accent hover:opacity-90"
            >
              {loading ? "در حال ارسال..." : "ارسال پیام"}
              <Send size={16} />
            </button>

            {success && (
              <p className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} /> پیام شما با موفقیت ارسال شد
              </p>
            )}
          </form>
        </motion.div>

        {/* FAQ */}
        <div className="max-w-6xl mx-auto mt-20">
          <h3 className="text-3xl font-bold mb-8 text-center">سوالات متداول</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* FAQ Cards */}
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                className="bg-surface border border-border rounded-xl p-6"
              >
                <h4 className="font-semibold mb-2">{f.q}</h4>
                <p className="text-faded text-sm leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const faqs = [
  {
    q: "چقدر طول می‌کشد پاسخ دریافت کنیم؟",
    a: "معمولاً کمتر از ۲۴ ساعت پاسخ داده می‌شود.",
  },
  {
    q: "آیا پشتیبانی تلفنی دارید؟",
    a: "بله، از ساعت ۹ تا ۱۸ پاسخگو هستیم.",
  },
  {
    q: "آیا امکان همکاری وجود دارد؟",
    a: "بله، از طریق فرم پیام دهید.",
  },
  {
    q: "آیا اطلاعات من محرمانه است؟",
    a: "بله، اطلاعات شما کاملاً محفوظ خواهد ماند.",
  },
];
