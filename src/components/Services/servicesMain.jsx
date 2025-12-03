// src/pages/Services.jsx   ← Correct location for Vite + React Router
import HeroSection from "../Services/heroSec";
import ServicesGrid from "../Services/serviceGrid";
import CaseStudiesSection from "../Services/caseStudies";
import FinalCTASection from "../Services/serviceCTA";
// Optional ones (if you have them):
// import ProcessSection from "@/components/Services/processSec";
// import TechStack from "@/components/AboutUs/TechStack";

export default function Services() {
  return (
    <main className="min-h-screen bg-base-100">
      <HeroSection />
      <ServicesGrid />
      {/* <ProcessSection /> */}
      <CaseStudiesSection />
      {/* <TechStack /> */}
      <FinalCTASection />
    </main>
  );
}