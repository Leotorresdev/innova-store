import { HeroSection } from '@/components/features/home/HeroSection';
import { FeaturesSection } from '@/components/features/home/FeaturesSection';
import { ProductsShowcase } from '@/components/features/home/ProductsShowcase';
import { AboutSection } from '@/components/features/home/AboutSection';
import { TestimonialSection } from '@/components/features/home/TestimonialSection';
import { ContactSection } from '@/components/features/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsShowcase />
      <AboutSection />
      <FeaturesSection />
      <TestimonialSection />
      <ContactSection />
    </>
  );
}
