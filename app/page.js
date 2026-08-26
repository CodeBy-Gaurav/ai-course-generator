import Header from "./_components/Header";
import Hero from "./_components/Hero";
import FeaturesBento from "./_components/FeaturesBento";
import HowItWorks from "./_components/HowItWorks";
import LiveCourseShowcase from "./_components/LiveCourseShowcase";
import PricingSection from "./_components/PricingSection";
import CTASection from "./_components/CTASection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* 1. Global Navigation */}
      <Header />

      {/* 2. Modern Tech Hero with Interactive App Mockup Preview */}
      <Hero />

      {/* 3. High-Tech Features Bento Grid */}
      <FeaturesBento />

      {/* 4. 3-Step Interactive Process */}
      <HowItWorks />

      {/* 5. Real Live Community Masterclasses */}
      <LiveCourseShowcase />

      {/* 6. Pricing Section (Free 5 Credits vs ₹499 Pro) */}
      <PricingSection />

      {/* 7. Conversion Bottom CTA */}
      <CTASection />

      {/* 8. Tech Footer */}
      <Footer />
    </div>
  );
}
