import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
  onScrollTo: (target: string) => void;
}

export default function HeroSection({ onScrollTo }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo('.hero-badge', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.hero-headline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .fromTo('.hero-subheadline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
        .fromTo('.hero-visual', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <Badge className="hero-badge mb-6 px-4 py-2 bg-primary text-white">
          <Sparkles className="w-4 h-4 mr-2" />
          Mevia Studio is now launching. Mevia App & Mevia Creates launching soon.
        </Badge>

        <h1 className="hero-headline font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 max-w-5xl mx-auto">
          The Unified Operating System for the{' '}
          <span className="text-primary">Entire Creator Ecosystem</span>
        </h1>

        <p className="hero-subheadline text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Built for brands, agencies, and creator-led teams — Mevia simplifies every
          broken part of creator marketing into one intelligent, automated workflow.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="hero-cta px-8 py-6 text-lg"
            onClick={() => onScrollTo('#waitlist')}
            data-testid="button-hero-demo"
          >
            Book a Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hero-cta px-8 py-6 text-lg"
            onClick={() => onScrollTo('#waitlist')}
            data-testid="button-hero-waitlist"
          >
            Join the Waitlist
          </Button>
        </div>

        <div className="hero-visual mt-16 relative">
          <div className="bg-gradient-to-b from-card to-card/50 rounded-xl border border-border shadow-2xl p-4 md:p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground font-medium">
                  Creator Intelligence. Zero Operational Friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
