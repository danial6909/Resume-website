

// src/components/LoginButton.js (Client Component)
'use client';

import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';

export default function LoginBtn() {
//   const { user, logout } = useAuth();
const user = null; // جایگزین با منطق واقعی احراز هویت

  if (user) {
    return (
      <div className="flex items-center space-x-2 space-x-reverse">
        {/* نمایش نام یا آواتار */}
        <span className="font-semibold text-gray-700">سلام، {user.name}!</span>
        <button 
          onClick={logout}
          className="text-white bg-red-600 hover:bg-red-700 font-semibold px-4 py-2 rounded-full transition duration-150"
        >
          خروج
        </button>
      </div>
    );
  }

  return (
    <Link 
      href="/login" 
      className="text-white bg-blue-600 hover:bg-blue-700 font-semibold px-5 py-2 rounded-full shadow-lg transition duration-300"
    >
      ورود
    </Link>
  );
}

// و در Header.js (SC) به جای دکمه Link قبلی، این کامپوننت را فراخوانی می‌کنید:
// <div><LoginButton /></div>