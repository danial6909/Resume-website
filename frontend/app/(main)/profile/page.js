// UserProfile.js
// این کامپوننت به طور پیش فرض در Next.js یک Server Component است



// کامپوننت‌های جدید Wrapper برای مدیریت Client State
import ClientProfileWrapper from '@/components/profile/ClientProfileWrapper';

// اطلاعات اولیه که در سرور واکشی می‌شود (مثلاً از یک دیتابیس)
const initialFormData = {
    firstName: "دانیال",
    username: "dan6909",
    email: "danial@example.com",
    phone: "09123456789",
    bio: "عاشق برنامه‌نویسی و یادگیری تکنولوژی‌های جدید.",
    // فیلدهای رمز عبور در سرور نگهداری نمی‌شوند
};

export default function UserProfile() {
  
    return (
        <div className=" bg-gray-50 text-gray-800 font-sans  " dir="rtl">
            {/* ClientProfileWrapper: بخش تعاملی و متغیر که باید در کلاینت رندر شود */}
            <ClientProfileWrapper initialData={initialFormData} />
        </div>
    );
}