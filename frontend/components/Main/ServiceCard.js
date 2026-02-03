
// "use client"
// import React from 'react';
// import { motion } from 'framer-motion';
// import { ArrowLeft } from 'lucide-react';
// import Link from 'next/link';


// const ServiceCard = ({ icon, title, description, readMore }) => {
//     // تعریف انیمیشن‌ها (بدون تغییر)
//     const cardVariants = {
//         hidden: { opacity: 0, y: 30, scale: 0.98 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             transition: {
//                 type: 'spring',
//                 stiffness: 100,
//                 damping: 15,
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { type: 'spring', stiffness: 120 }
//         }
//     };

//     return (
//         <motion.div
//             dir="rtl"
//             className="relative p-px border-2 border-border font-sans " // گرد کردن گوشه کانتینر اصلی
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//           whileHover={{ 
//                 scale: 1.03, // کمی بزرگنمایی برای حس بهتر
//                 boxShadow: "0px 0px 30px -5px rgba(0, 188, 145, 0.35)",
//                  // سایه درخشان
//                  borderColor: "#00bc91" 
//             }}
//             transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//         >
           
//             <div className="relative flex flex-col justify-between h-72 w-full max-w-sm p-6 bg-background backdrop-blur-xl rounded-[15px] z-5 overflow-hidden">
                
//                 {/* گروه بالایی: تمام محتوا به جز دکمه */}
//                 <div>
//                     <motion.div variants={itemVariants} className="grid place-items-center w-12 h-12 bg-primary-accent text-3xl rounded-lg">
//                         {icon}
//                     </motion.div>
                    
//                     <motion.h2 variants={itemVariants} className="text-xl text-right font-bold text-text-main mt-4">
//                         {title}
//                     </motion.h2>
                    
//                     <motion.p variants={itemVariants} className="text-base text-text-faded leading-relaxed text-right mt-2">
//                         {description}
//                     </motion.p>
//                 </div>
                
//                 {/* 
//                   دکمه به داخل کانتینر flex بازگشته 
//                   و دیگر position: absolute ندارد.
//                 */}
//                 <motion.Link href="#" variants={itemVariants} className="flex items-center gap-1 text-primary-accent font-semibold group cursor-pointer">
//                     {readMore}
                
//                     <ArrowLeft className="w-5 h-5 mt-1 transition-transform duration-300 group-hover:-translate-x-1.5"/>
//                 </motion.Link>
//             </div>
//         </motion.div>
//     );
// };

// export default ServiceCard;



"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const ServiceCard = ({ icon, title, description, readMore }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 120 }
        }
    };

    return (
        <motion.div
            dir="rtl"
            className="relative p-px border-2 border-border font-sans overflow-hidden group rounded-sm "
            // حذف تمام rounded-[16px] و جایگزینی با rounded-none
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0px 0px 30px -5px rgba(0, 188, 145, 0.35)",
                borderColor: "#00bc91" 
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* محتوای اصلی کارت - border-radius حذف شد */}
            <div className="relative flex flex-col justify-between h-72 w-full max-w-sm p-6 bg-background backdrop-blur-xl">
                <div>
                    <motion.div variants={itemVariants}
                     className="grid place-items-center w-12 h-12 bg-primary-accent text-3xl rounded-lg">
                        {icon}
                    </motion.div>
                    
                    <motion.h2 variants={itemVariants} className="text-xl text-right font-bold text-text-main mt-4">
                        {title}
                    </motion.h2>
                    
                    <motion.p variants={itemVariants} className="text-base text-text-faded leading-relaxed text-right mt-2">
                        {description}
                    </motion.p>
                </div>
                
                <motion.a href="#" variants={itemVariants} className="flex items-center gap-1 text-primary-accent font-semibold cursor-pointer">
                    {readMore}
                    <ArrowLeft className="w-5 h-5 mt-1 transition-transform duration-300 group-hover:-translate-x-1.5"/>
                </motion.a>
            </div>

            {/* لایه فلش سفید - شدت نور کاهش پیدا کرد */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-[100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-out">
                   
                    <div className="absolute inset-[-10%] rotate-12 bg-gradient-to-br from-transparent via-white to-transparent opacity-10 blur-md " />
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;