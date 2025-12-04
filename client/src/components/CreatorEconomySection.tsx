import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, AlertTriangle, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CreatorEconomySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.economy-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.economy-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.economy-cards',
            start: 'top 85%',
          },
        }
      );

      const statValue = document.querySelector('.stat-value');
      if (statValue) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 3375,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statValue,
            start: 'top 85%',
          },
          onUpdate: () => {
            if (statValue) {
              statValue.textContent = `₹${Math.round(obj.val).toLocaleString()}`;
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background"
      data-testid="section-creator-economy"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 economy-heading">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            Market Insights
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Creator Economy is Booming.
            <br />
            <span className="text-primary">Are Your Systems Ready?</span>
          </h2>
        </div>

        <div className="economy-cards grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="economy-card p-8 border-border/50 relative overflow-visible">
            <div className="absolute -top-4 left-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="pt-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                Gear your systems up.
              </h3>
              <div className="mb-4">
                <span className="stat-value text-5xl md:text-6xl font-heading font-bold text-primary">
                  ₹0
                </span>
                <span className="text-2xl font-heading font-bold text-primary ml-1">
                  crore
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                India's Creator marketing economy is expected to reach{' '}
                <strong className="text-foreground">₹3,375 crore</strong> (about USD 400
                million) by 2026, reflecting a consistent{' '}
                <strong className="text-foreground">25% annual growth rate</strong> from
                recent years.
              </p>
            </div>
          </Card>

          <Card className="economy-card p-8 border-border/50 relative overflow-visible">
            <div className="absolute -top-4 left-6">
              <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="pt-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                Reality Check.
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Despite rapid growth in the creator economy, over{' '}
                  <strong className="text-foreground">80% of creator marketers</strong>{' '}
                  continue to manage recruitment and campaigns through Excel, while
                  WhatsApp remains the primary communication channel.
                </p>
                <div className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/10">
                  <Clock className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    Creator marketing teams spend up to half their time on admin-heavy
                    tasks, with estimates showing{' '}
                    <strong>15+ hours a week lost</strong> to non-strategic work.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
