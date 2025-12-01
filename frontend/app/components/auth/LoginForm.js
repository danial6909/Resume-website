// app/components/auth/LoginForm.js

'use client'; 

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // برای ناوبری

// ✅ مطمئن شوید که این مسیر درست باشد
import './LoginForm.css'; 


// ******************************************************
// ✅ رفع خطای ReferenceError: setupParticles
// تابع را در اینجا تعریف می‌کنیم تا در دسترس useEffect باشد.
// ******************************************************
const setupParticles = (canvasRef) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // ... (تمام تعریف کلاس Particle و توابع init، animate، و Listenerها از کدهای قبلی شما) ...
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = ['#e81cff', '#40c9ff', '#64ffda'][Math.floor(Math.random() * 3)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        const particleCount = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 3000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 - distance / 1000})`; 
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        animationId = requestAnimationFrame(animate);
    }
    
    setCanvasSize();
    init();
    animate();

    const resizeListener = () => { setCanvasSize(); init(); };
    window.addEventListener('resize', resizeListener);

    const mouseMoveListener = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        particles.forEach(p => {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                p.speedX += dx * 0.01; 
                p.speedY += dy * 0.01;
            }
        });
    };
    canvas.addEventListener('mousemove', mouseMoveListener);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resizeListener);
        canvas.removeEventListener('mousemove', mouseMoveListener);
    };
};
// ******************************************************


export default function LoginForm() {
    const router = useRouter(); 
    const canvasRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        const cleanup = setupParticles(canvasRef); // 👈 تابع الان شناخته شده است
        return cleanup;
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // شبیه‌سازی API call
        setTimeout(() => {
            setIsLoading(false);

            // در حالت واقعی، پاسخ سرور را چک می‌کنید
            const success = true; 

            if (success) {
                // router.refresh(); // اگر از Server Action استفاده کردید
                alert('✅ ورود موفقیت‌آمیز بود! (هدایت به داشبورد)');
                router.push('/dashboard'); // 🚀 ناوبری به صفحه جدید
            } else {
                alert('❌ خطای ورود.');
            }
            
        }, 1200);
    };

    return (
        <>
            {/* Canvas و Overlay */}
            <canvas ref={canvasRef} id="particles-canvas" className="fixed top-0 left-0 w-full h-full z-0"></canvas>
            <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/30"></div>

            {/* کانتینر فرم - z-index: 2 */}
            <div className="relative z-20">
                {/* ✅ ترکیب کلاس‌های CSS سفارشی و Tailwind: 
                  کلاس form-container-custom استایل‌های پیچیده (گرادیان، Blur، پدینگ و مارجین) را مدیریت می‌کند.
                  بقیه کلاس‌های لازم Tailwind برای نمایش (مثل flex, gap-5) را حفظ می‌کنیم.
                */}
                <div className={`form-container-custom w-full max-w-sm rounded-2xl text-white flex flex-col gap-5 mx-auto`}>
                    
                    <h1 className="text-center font-bold text-xl mb-2">Welcome Back</h1>
                    <div className="h-0.5 w-10 bg-gradient-to-r from-[#e81cff] to-[#40c9ff] mx-auto rounded-sm mb-2"></div>

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        
                        {/* INPUTS */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-xs font-semibold text-gray-500">Company Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/10 rounded-lg border border-gray-700 text-white text-sm focus:border-[#e81cff] focus:ring-2 focus:ring-[#e81cff]/20 outline-none transition-all duration-300"
                                placeholder="you@company.com"
                                required
                            />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-xs font-semibold text-gray-500">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/10 rounded-lg border border-gray-700 text-white text-sm focus:border-[#e81cff] focus:ring-2 focus:ring-[#e81cff]/20 outline-none transition-all duration-300"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* CHECKBOX AND FORGOT PASSWORD */}
                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center text-gray-500 cursor-pointer">
                                <input type="checkbox" className="mr-1.5 accent-[#e81cff]" />
                                Remember me
                            </label>
                            {/* دکمه "Forgot password" در تصویر شما به سمت چپ کشیده شده بود. 
                                ما با flex justify-between این مشکل را در این div حل کرده‌ایم. 
                            */}
                            <a href="#" className="text-[#40c9ff] no-underline transition-colors duration-200 hover:text-[#64ffda] hover:underline">Forgot password?</a>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            // ✅ ترکیب کلاس‌های CSS سفارشی و Tailwind برای افکت Hover
                            className={`form-submit-btn-custom active-animate-buttonPress 
                                w-full p-3 border-none rounded-lg bg-[#1a1a1a] text-gray-300 font-semibold text-sm cursor-pointer 
                                transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-[#2d003a] hover:to-[#002d3a] 
                                hover:text-white hover:shadow-lg hover:shadow-[rgba(100,255,218,0.4)] hover:-translate-y-0.5 
                                active:scale-[0.96] active:shadow-lg active:shadow-[rgba(232,28,255,0.6)]
                                ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}
                            `} 
                            id="loginBtn"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-600 mt-4">
                        Don’t have an account? <a href="#" className="text-[#40c9ff] font-medium hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </>
    );
}