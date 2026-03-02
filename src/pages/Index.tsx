import PitchNav from "@/components/PitchNav";
import HeroSection from "@/components/HeroSection";
import TransformationSection from "@/components/TransformationSection";
import MetricsSection from "@/components/MetricsSection";
import DeliverySection from "@/components/DeliverySection";
import CultureSection from "@/components/CultureSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PitchNav />
      <HeroSection />
      <TransformationSection />
      <MetricsSection />
      <DeliverySection />
      <CultureSection />
    </div>
  );
};

export default Index;
