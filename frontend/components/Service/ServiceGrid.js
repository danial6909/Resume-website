"use client";

import React from "react";
import { motion } from "framer-motion"; // اضافه شد
import ServiceCard from "./ServiceCard";
import { servicesData } from "@/services/servicesData";

/* ================== آیکون‌ها ================== */
const WebIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const MobileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const SeoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ServicesGrid = () => {
  const getIcon = (type) => {
    switch (type) {
      case "web": return <WebIcon />;
      case "mobile": return <MobileIcon />;
      case "seo": return <SeoIcon />;
      default: return <WebIcon />;
    }
  };

  // تعریف واریانت برای کل شبکه (مثل فوتر)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // چون گفتی همه با هم، عدد stagger را بسیار کم یا صفر می‌گذاریم
        staggerChildren: 0.05, 
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 mt-12 mb-20">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {servicesData.map((service) => (
          <ServiceCard
            key={service.id}
            slug={service.slug}
            icon={getIcon(service.iconType)}
            title={service.title}
            description={service.description}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ServicesGrid;