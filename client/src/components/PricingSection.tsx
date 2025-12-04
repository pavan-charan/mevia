import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-content',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-20 lg:py-32 bg-background"
      data-testid="section-pricing"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="pricing-content max-w-2xl mx-auto text-center">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Pricing Plans
          </h2>

          <Card className="p-8 lg:p-12 border-border/50 relative overflow-visible">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>

            <div className="pt-4">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>

              <p className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
                Will be revealed shortly...
              </p>

              <p className="text-muted-foreground max-w-md mx-auto">
                We're finalizing our pricing plans to ensure maximum value for your
                creator marketing needs. Join our waitlist to be the first to know.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
