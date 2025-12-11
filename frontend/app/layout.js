// app/layout.js
import './globals.css';
import { AuthProvider } from "@/context/AuthContext";
import {ThemeProvider} from '@/context/ThemeContext'
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
    
      <body className="font-sans  bg-background **: ">
      <AuthProvider>
        <ThemeProvider>
        {children}
        </ThemeProvider>
        </AuthProvider>
      </body>
      
    </html>
  );
} 