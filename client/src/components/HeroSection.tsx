import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import gsap from 'gsap';
import ParticleField from './ParticleField';

interface HeroSectionProps {
  onScrollTo: (target: string) => void;
}

export default function HeroSection({ onScrollTo }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo('.hero-badge', { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' })
        .fromTo('.hero-headline .word', { opacity: 0, y: 60, rotationX: -90 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-subheadline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta', { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.3')
        .fromTo('.hero-visual', { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.4')
        .fromTo('.floating-element', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2)' }, '-=0.6');

      gsap.to('.floating-element', {
        y: 'random(-15, 15)',
        x: 'random(-10, 10)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 5)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.3,
          from: 'random',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = "The Unified Operating System for the Entire Creator Ecosystem".split(' ');

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
      data-testid="section-hero"
    >
      <ParticleField />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="floating-element absolute top-[15%] left-[8%] w-16 h-16 bg-primary/10 rounded-2xl backdrop-blur-sm border border-primary/20 flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-primary/60" />
      </div>
      <div className="floating-element absolute top-[25%] right-[10%] w-20 h-20 bg-primary/8 rounded-full backdrop-blur-sm border border-primary/15" />
      <div className="floating-element absolute bottom-[30%] left-[5%] w-12 h-12 bg-primary/12 rounded-xl backdrop-blur-sm border border-primary/20" />
      <div className="floating-element absolute bottom-[20%] right-[15%] w-14 h-14 bg-primary/10 rounded-2xl backdrop-blur-sm border border-primary/15 flex items-center justify-center">
        <Play className="w-6 h-6 text-primary/50" />
      </div>
      <div className="floating-element absolute top-[50%] left-[15%] w-8 h-8 bg-primary/15 rounded-full" />
      <div className="floating-element absolute top-[35%] right-[25%] w-10 h-10 bg-primary/8 rounded-lg" />

      <div ref={textRef} className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center z-10">
        <Badge className="hero-badge mb-6 px-4 py-2 bg-primary text-white cursor-pointer hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 mr-2" />
          Mevia Studio is now launching. Mevia App & Mevia Creates launching soon.
        </Badge>

        <h1 className="hero-headline font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 max-w-5xl mx-auto">
          {headlineWords.map((word, index) => (
            <span key={index} className="word inline-block mr-[0.25em]" style={{
              color: ['Entire', 'Creator', 'Ecosystem'].includes(word) ? 'hsl(var(--primary))' : undefined
            }}>
              {word}
            </span>
          ))}
        </h1>

        <p className="hero-subheadline text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Built for brands, agencies, and creator-led teams — Mevia simplifies every
          broken part of creator marketing into one intelligent, automated workflow.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="hero-cta px-8 py-6 text-lg group"
            onClick={() => onScrollTo('#waitlist')}
            data-testid="button-hero-demo"
          >
            Book a Demo
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hero-cta px-8 py-6 text-lg group"
            onClick={() => onScrollTo('#waitlist')}
            data-testid="button-hero-waitlist"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        <div className="hero-visual mt-16 relative">
          <div className="bg-gradient-to-b from-card to-card/50 rounded-2xl border border-border shadow-2xl p-4 md:p-8 max-w-4xl mx-auto backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,83,166,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,83,166,0.08),transparent_50%)]" />
              <div className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary/30 cursor-pointer hover:scale-110 hover:bg-primary/30 transition-all duration-300">
                  <Play className="w-12 h-12 text-primary ml-1" />
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
