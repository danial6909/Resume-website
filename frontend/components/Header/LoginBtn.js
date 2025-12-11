// src/components/LoginBtn.js (Client Component)
"use client";

import Link from "next/link";

export default function LoginBtn() {
  // بعداً جایگزین کن:
  // const { user, logout } = useAuth();
  const user = null; // ← برای تست

  const logout = () => {
    // logout logic (مثلاً redirect یا clear cookie)
    console.log("Logged out");
  };

  if (user) {
    return (
      <div className="flex items-center space-x-3 space-x-reverse">
        <span className="font-medium text-faded dark:text-text-faded">
          سلام،{" "}
          <span className="text-main font-semibold dark:text-text-main">
            {user.name}
          </span>
        </span>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all
                     dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/30"
        >
          خروج
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* دکمه ورود */}
      <Link
        href="/login"
        className="relative cursor-pointer py-2 px-4 text-center font-barlow inline-flex justify-center text-base uppercase dark:text-white text-black rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 dark:focus:outline-white focus:outline-black focus:outline-offset-4 overflow-hidden mr-3.5"
      >
        <span className="relative z-20">ورود / ثبت نام</span>
        <span className="absolute left-[-75%] top-0 h-full w-[50%] dark:bg-white/20 bg-black/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out" />
        <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-black dark:border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0" />
        <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-black dark:border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0" />
        <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-black dark:border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0" />
        <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-black dark:border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0" />
      </Link>
    </div>
  );
}
