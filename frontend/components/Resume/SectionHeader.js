import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./animations";
import TitleHeaderPages from "../TitleHeaderPages";

export default function SectionHeader({
  activeResume,
  setActiveResume,
  setAiAnalysis,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 ">
       <TitleHeaderPages title1="Resume" title2="رزومه "/>
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
                  type === "danial" ? "bg-emerald-600 " : "bg-blue-600"
                } rounded-xl -z-10`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {type === "danial" ? "دانیال (Front-end)" : "علی (Back-end)"}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
