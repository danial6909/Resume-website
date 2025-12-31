import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

export default function SkillSection({ current }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Code size={20} style={{ color: current.color }} />
        <h4 className="text-xl font-bold">مهارت‌های فنی</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {current.skills.map((skill, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-text-main/90">{skill.name}</span>
              <span className="text-xs text-text-faded">{skill.level}%</span>
            </div>
            <div className="h-1.5 bg-surface rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "circOut", delay: 0.3 }}
                className="h-full"
                style={{ backgroundColor: current.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}