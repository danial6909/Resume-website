import { motion } from "framer-motion";
import { Volume2, Loader2 } from "lucide-react";
import Image from "next/image";


export default function ProfileVisual({ current, isSpeaking, onPlayVoice }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="order-1 lg:order-1"
    >
      <div className="relative aspect-[4.2/5] rounded-[0.5rem] overflow-hidden border border-border  shadow-2xl">
        <motion.div
       
        >
          <Image
            src={current.image}
            alt={current.name}
            fill
            className="object-cover"
          />
        </motion.div>

        <button
          onClick={onPlayVoice}
          disabled={isSpeaking}
          className="absolute top-5 right-5 z-20 p-4 bg-text-faded text-black rounded-xl shadow-2xl cursor-pointer hover:bg-text-faded/90 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
          {isSpeaking ? (
            <Loader2 className="animate-spin" size={15} />
          ) : (
            <Volume2 size={15} />
          )}
        </button>
      </div>
    </motion.div>
  );
}
