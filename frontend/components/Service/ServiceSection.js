"use client"
import TitleHeaderPages from "../TitleHeaderPages";
import ServiceGrid from "./ServiceGrid";
import ProcessTimeline from "./ProcessTimeline";
import PricingPlans from "./PricingPlans";
import FAQSection from "./FAQSection";
import ContactCTA from "./ContactCTA";

export default function Service() {
  return (
    <div className="min-h-screen bg-background text-white font-[vazir] selection:bg-[#00bc91]/30 overflow-x-hidden" dir="rtl">
      <div className="pt-10 px-6 mx-auto max-w-7xl">
        <TitleHeaderPages title1="Service" title2="خدمات " />
      </div>

      <ServiceGrid />
      <ProcessTimeline />
      <PricingPlans />
      <FAQSection />
      <ContactCTA />

      <style jsx global>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}