// app/layout.js
import './globals.css';
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/components/Theme/Providers";
import MouseFollower from "@/components/MouseFollower";
import ScrollToTop from "@/components/ScrollToTop"; // دکمه رو اینجا ایمپورت کن
// app/layout.js


export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning={true}>
      <body className="font-sans bg-background">
        <AuthProvider>
          <Providers>
            <MouseFollower /> 
            {children}
            <ScrollToTop />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}