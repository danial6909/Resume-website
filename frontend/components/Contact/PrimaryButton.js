"use client";
import { motion } from "framer-motion";

const PrimaryButton = ({ 
  children, 
  onClick, 
  type = "submit",
  className = "", 
  padding = "p-[12px_25px]", // مقدار پیش‌فرض پدینگ
  width = "w-full",         // مقدار پیش‌فرض عرض
  height = "h-auto",        // مقدار پیش‌فرض ارتفاع
  disabled = false 
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { opacity: 0.9 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${width} ${padding} ${height}  ${className}
        flex items-center justify-center gap-2 
        mx-auto
        bg-primary-accent text-white font-bold rounded-lg
        transition-all group cursor-pointer 
        shadow-lg shadow-primary-accent/20 
        disabled:bg-gray-500 disabled:cursor-not-allowed
      `}
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;