// app/layout.js
import './globals.css';
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
    
      <body className="font-sans bg-gray-50">
      <AuthProvider>
        {children}
        </AuthProvider>
      </body>
      
    </html>
  );
} 