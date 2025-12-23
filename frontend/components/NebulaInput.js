import React from 'react';

const NebulaInput = ({ label, id, type = "input", ...props }) => {
  const particles = [
    { x: '-0.2', y: '-0.4', delay: '0.1s' },
    { x: '-0.5', y: '-0.2', delay: '0.3s' },
    { x: '-0.3', y: '0.3', delay: '0.5s' },
    { x: '-0.7', y: '0.1', delay: '0.2s' },
    { x: '-0.1', y: '-0.7', delay: '0.4s' },
    { x: '-0.6', y: '0.4', delay: '0.6s' },
  ];

  // تشخیص اینکه اینپوت باشد یا تکست‌اریا
  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div className={`relative w-full my-[15px] group ${props.className || ''}`} dir="rtl">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nebula-float {
          0% { transform: translate(0, -50%) scale(0.8); opacity: 0; background: #00bc91; }
          20% { opacity: 0.8; }
          100% { transform: translate(calc(var(--x) * 140px), calc(var(--y) * 35px)) scale(1.1); opacity: 0; background: #00bc91; }
        }
        .nebula-particle {
          position: absolute; width: 6px; height: 6px; border-radius: 50%;
          pointer-events: none; opacity: 0; top: 30px; right: 10px;
          filter: blur(0.8px); mix-blend-mode: screen; transition: opacity 0.3s ease;
        }
        .peer:focus ~ .nebula-particle { animation: nebula-float 2s forwards ease-out; }
      `}} />

      <InputComponent
        {...props}
        id={id}
        required
        placeholder=" " 
        className="peer w-full p-[15px] border-2 border-border bg-background text-[#ffffff] text-[16px] text-right outline-none rounded-[8px] transition-all duration-700 ease-in-out 
                   focus:border-[#00bc91] 
                   focus:shadow-[0_5px_8px_rgba(0,188,145,0.2),0_10px_20px_rgba(0,188,145,0.1)]
                   min-h-[55px]" // حداقل ارتفاع برای هماهنگی
      />

      <label
        htmlFor={id}
        className="absolute right-[15px] top-[15px] pointer-events-none text-muted-foreground bg-background px-[5px] 
                   transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
                   peer-focus:-translate-y-[25px] peer-focus:text-[12px] peer-focus:text-[#00bc91] peer-focus:right-[10px] 
                   peer-[:not(:placeholder-shown)]:-translate-y-[25px] peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:text-[#00bc91] peer-[:not(:placeholder-shown)]:right-[10px]"
        style={{ transformOrigin: 'right' }}
      >
        {label}
      </label>

      {particles.map((particle, index) => (
        <div
          key={index}
          className="nebula-particle"
          style={{
            '--x': particle.x,
            '--y': particle.y,
            animationDelay: particle.delay
          }}
        />
      ))}
    </div>
  );
};

export default NebulaInput;