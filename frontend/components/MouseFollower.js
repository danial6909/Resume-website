"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseTrail = () => {
  const [trail, setTrail] = useState([]);
  const MAX_POINTS = 20; // تعداد نقطه‌های دنباله (هر چی بیشتر، دنباله بلندتر)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      
      setTrail((prevTrail) => {
        // اضافه کردن نقطه جدید و حذف قدیمی‌ترین نقطه برای حفظ طول دنباله
        const updatedTrail = [...prevTrail, newPoint];
        if (updatedTrail.length > MAX_POINTS) {
          return updatedTrail.slice(1);
        }
        return updatedTrail;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }} // هر چی دورتر میشه محو و کوچک‌تر میشه
          transition={{ duration: 0.5 }}
          style={{
            left: point.x,
            top: point.y,
            width: 8,
            height: 8,
            backgroundColor: "var(--primary-accent, #00bc91)",
            boxShadow: "0 0 10px var(--primary-accent)",
            translateX: "-50%",
            translateY: "-50%",
            // هر نقطه نسبت به جایگاهش در لیست، شفافیت کمتری می‌گیره
            opacity: index / trail.length, 
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;