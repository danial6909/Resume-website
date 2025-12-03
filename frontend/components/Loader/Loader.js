// components/Loader/Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      {/* حلقه‌های متحرک */}
      <div className="relative w-20 h-20">
        {/* حلقه بیرونی */}
        <div className="absolute inset-0 border-4 border-t-transparent border-r-transparent border-b-blue-500 border-l-blue-400 rounded-full animate-spin-slow"></div>
        {/* حلقه داخلی */}
        <div className="absolute inset-2 border-4 border-t-transparent border-r-purple-400 border-b-transparent border-l-purple-500 rounded-full animate-spin"></div>
      </div>

      {/* متن فارسی (اختیاری) */}
      <p className="mt-4 text-gray-600 font-medium text-sm animate-pulse">
        در حال ورود...
      </p>
    </div>
  );
};

export default Loader;