// این تابع تمام ارورهای فیلد-محور رو به صورت خودکار روی فرم ست می‌کنه
export const applyServerErrors = (error, setError) => {
  if (error.type === "field_errors") {
    Object.keys(error.data).forEach((field) => {
      const errorData = error.data[field];
      const message = Array.isArray(errorData) ? errorData.join("\n") : errorData;
      
      setError(field, { type: "server", message });
    });
  } else if (error.type === "general_error") {
    // اگر ارور کلی بود، روی root فرم ست بشه
    setError("root", { message: error.message });
  }
};



// کد با نقطه کنار ارور ها

// // utils/formHelpers.js
// export const applyServerErrors = (error, setError, manualField = null) => {
//   if (error.type === "field_errors") {
//     Object.keys(error.data).forEach((field) => {
//       const errorData = error.data[field];
      
//       // دلیل تغییر: اضافه کردن نقطه قبل از هر پیام و چسباندن آن‌ها
//       const message = Array.isArray(errorData) 
//         ? errorData.map(msg => `• ${msg}`).join("\n") 
//         : `• ${errorData}`;
      
//       // اگر فیلدی مثل code در بک‌اِند بود ولی ما می‌خواستیم روی فیلد دیگری نشان دهیم
//       setError(field, { type: "server", message });
//     });
//   } else if (error.type === "general_error") {
//     // اگر ارور کلی بود، یا روی فیلد مدنظر ما یا روی root ست می‌شود
//     setError(manualField || "root", { message: `• ${error.message}` });
//   }
// };

