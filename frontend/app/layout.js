// app/layout.js
import './globals.css';
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/components/Theme/Providers"; // ایمپورت جدید

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning برای جلوگیری از اخطار تفاوت محتوای سرور و کلاینت در تم ضروریه
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="font-sans bg-background">
        <AuthProvider>
          <Providers>
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}