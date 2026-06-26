import { HeroSection } from '@/components/features/home/HeroSection';
import { FeaturesSection } from '@/components/features/home/FeaturesSection';
import { ProductsShowcase } from '@/components/features/home/ProductsShowcase';
import { AboutSection } from '@/components/features/home/AboutSection';
import { PreordersSection } from '@/components/features/home/PreordersSection';
import { TestimonialSection } from '@/components/features/home/TestimonialSection';
import { ContactSection } from '@/components/features/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProductsShowcase />
      <AboutSection />
      <TestimonialSection />
      <PreordersSection />
      <ContactSection />
    </>
  );
}