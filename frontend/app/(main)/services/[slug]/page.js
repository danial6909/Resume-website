// app/services/[slug]/page.jsx
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getServiceBySlug } from "@/services/servicesData";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const SingleServicePage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const service = getServiceBySlug(slug);

  if (!service) return <div className="text-center py-20">خدمت مورد نظر یافت نشد.</div>;

  return (
    <div className="min-h-screen bg-background text-white font-[vazir] pb-20" dir="rtl">
      {/* Header بخش */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#00bc91]/10 backdrop-blur-3xl z-0" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <span className="text-[#00bc91] font-bold tracking-widest uppercase text-sm">خدمات تخصصی</span>
          <h1 className="text-4xl md:text-6xl font-black mt-4">{service.title}</h1>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* ستون اصلی توضیحات */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-surface border border-border p-8 md:p-12 rounded-[2.5rem] shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#00bc91]">درباره این خدمت</h2>
            <p className="text-gray-400 leading-loose text-lg text-justify">
              {service.fullDescription}
            </p>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5"
                >
                  <CheckCircle2 className="text-[#00bc91] w-5 h-5" />
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ستون کناری (Sidebar) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-[#00bc91] p-8 rounded-[2.5rem] text-background">
              <h3 className="text-xl font-black mb-4">نیاز به مشاوره دارید؟</h3>
              <p className="text-sm leading-relaxed mb-6 opacity-90">
                اگر در مورد این خدمت سوالی دارید یا می‌خواهید پروژه خود را شروع کنید، ما آماده شنیدن صدای شما هستیم.
              </p>
              <button className="w-full bg-background text-white py-4 rounded-2xl font-bold hover:scale-105 transition-transform cursor-pointer">
                شروع گفتگو
              </button>
            </div>

            <button 
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-2 py-4 border border-border rounded-2xl hover:bg-white/5 transition-all cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
              بازگشت به همه خدمات
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SingleServicePage;