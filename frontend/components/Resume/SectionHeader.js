import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./animations";

export default function SectionHeader({
  activeResume,
  setActiveResume,
  setAiAnalysis,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 "
    >
      <div className="relative">
        {/* عدد بزرگ محو در پس‌زمینه (مثلا 01 یا Resume) */}
        <span className="  absolute -top-8 -right-4 text-8xl font-black text-text-main/[0.03] select-none">
          RESUME
        </span>

        <div className="relative z-10 space-y-2">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black leading-none"
          >
            <span className="block text-text-main">رزومه</span>
            <span
              className="block text-transparent bg-clip-text border-text-main"
              style={{ WebkitTextStroke: `1px rgba(255,255,255,0.2)` }}
            >
              تیم ما
            </span>
          </motion.h2>
        </div>
      </div>

      <motion.div
        variants={itemVariants}
        className="flex bg-surface p-1.5 rounded-2xl border border-border shadow-2xl"
      >
        {["danial", "partner"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setActiveResume(type);
              setAiAnalysis("");
            }}
            className={`relative px-8 py-3 rounded-xl font-bold cursor-pointer transition-all duration-300 z-10 ${
              activeResume === type ? "text-white" : "text-text-faded"
            }`}
          >
            {activeResume === type && (
              <motion.div
                layoutId="tabBg"
                className={`absolute inset-0 ${
                  type === "danial" ? "bg-blue-600" : "bg-emerald-600"
                } rounded-xl -z-10`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {type === "danial" ? "دانیال (Front-end)" : "علی (Back-end)"}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}
