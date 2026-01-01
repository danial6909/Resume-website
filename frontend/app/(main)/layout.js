// src/app/(main)/layout.js (Nested Layout - بدون <html>، <body> و Context)

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function MainLayout({ children }) {
  return (
    <>
     
        <Header />
        <main className="mt-16" >{children}</main>
        <Footer/>
    </>
  );
}
