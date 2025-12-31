import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Loader2 } from 'lucide-react';
import { itemVariants } from './animations';

export default function AiAssistantCard({ aiAnalysis, isAnalyzing, onGenerate }) {
  return (
    <motion.div variants={itemVariants} className="p-6 bg-surface rounded-3xl border border-border shadow-lg">
      <div className="flex items-center gap-2 mb-3 text-text-faded text-[10px] font-black uppercase tracking-widest">
        <Sparkles size={14} className="text-amber-400" /> تحلیل هوشمند AI
      </div>
      {aiAnalysis ? (
        <p className="text-sm text-text-faded italic animate-in fade-in">"{aiAnalysis}"</p>
      ) : (
        <button onClick={onGenerate} className="w-full py-3 bg-text-main/5 hover:bg-text-main/10 rounded-xl flex items-center justify-center gap-3 border border-border text-sm font-bold">
          {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <BrainCircuit size={16} />}
          دریافت نقشه راه یادگیری از Gemini ✨
        </button>
      )}
    </motion.div>
  );
}