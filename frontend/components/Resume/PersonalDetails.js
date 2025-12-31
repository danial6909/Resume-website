import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from './animations';

export default function PersonalDetails({ current }) {
  const details = [
    { label: "نام", value: current.name },
    { label: "ایمیل", value: current.email },
    { label: "تلفن", value: current.phone },
    { label: "آدرس", value: current.location },
    { label: "تجربه", value: current.experience },
    { label: "فریلنس", value: current.freelance },
  ];

  return (
    <motion.div 
      variants={containerVariants} initial="hidden" animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-y border-border py-8"
    >
      {details.map((info, idx) => (
        <motion.div key={idx} variants={itemVariants} className="flex items-center gap-3">
          <span className="text-text-muted font-semibold min-w-[70px] text-sm">{info.label}</span>
          <span className="text-text-faded">:</span>
          <span className="text-text-faded text-sm font-medium">{info.value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}