import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PainPointsSection from '@/components/PainPointsSection';
import CoreSection from '@/components/CoreSection';
import MetricsSection from '@/components/MetricsSection';
import EcosystemSection from '@/components/EcosystemSection';
import FeaturesSection from '@/components/FeaturesSection';
import BeneficiariesSection from '@/components/BeneficiariesSection';
import CreatorEconomySection from '@/components/CreatorEconomySection';
import PricingSection from '@/components/PricingSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollTo = (target: string) => {
    const element = document.querySelector(target);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element as HTMLElement, {
        offset: -80,
        duration: 1.2,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Navigation onScrollTo={scrollTo} />
      <main>
        <HeroSection onScrollTo={scrollTo} />
        <PainPointsSection />
        <CoreSection />
        <MetricsSection />
        <EcosystemSection />
        <FeaturesSection />
        <BeneficiariesSection />
        <CreatorEconomySection />
        <PricingSection />
        <WaitlistSection />
      </main>
      <Footer onScrollTo={scrollTo} />
    </div>
  );
}
