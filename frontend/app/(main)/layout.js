// src/app/(main)/layout.js (Nested Layout - بدون <html>، <body> و Context)

import Header from "@/components/Header/Header";

export default function MainLayout({ children }) {
  return (
    <>
     
        <Header />
        <main >{children}</main>
    
    </>
  );
}
