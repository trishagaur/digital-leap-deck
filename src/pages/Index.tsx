import PitchNav from "@/components/PitchNav";
import HeroSection from "@/components/HeroSection";
import TransformationSection from "@/components/TransformationSection";
import CustomerSection from "@/components/CustomerSection";
import MetricsSection from "@/components/MetricsSection";
import DeliverySection from "@/components/DeliverySection";
import CultureSection from "@/components/CultureSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PitchNav />
      <HeroSection />
      <TransformationSection />
      <CustomerSection />
      <MetricsSection />
      <DeliverySection />
      <CultureSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
