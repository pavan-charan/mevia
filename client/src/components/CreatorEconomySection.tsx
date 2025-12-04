import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from './AnimatedBackground';
import { TrendingUp, AlertTriangle, Clock, IndianRupee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function AnimatedValue({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2500;
            const start = Date.now();

            const animate = () => {
              const elapsed = Date.now() - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
              setValue(Math.round(eased * target));

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}{suffix}
    </span>
  );
}

export default function CreatorEconomySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.economy-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
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
          scrollTrigger: { trigger: '.economy-cards', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
      data-testid="section-creator-economy"
    >
      <AnimatedBackground variant="grid" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
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
          <Card
            className={`economy-card p-8 border-border/50 relative overflow-hidden cursor-pointer transition-all duration-500 ${
              activeCard === 0 ? 'scale-[1.02] shadow-xl shadow-primary/10' : ''
            }`}
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="absolute top-1 left-6">
              <div className={`w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
                activeCard === 0 ? 'scale-110 rotate-6' : ''
              }`}>
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/3 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="pt-8 relative z-10">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                Gear your systems up.
              </h3>
              <div className="mb-4 flex items-baseline gap-1">
                <IndianRupee className="w-8 h-8 text-primary" />
                <span className="text-5xl md:text-6xl font-heading font-bold text-primary">
                  <AnimatedValue target={3375} />
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

              <div className="mt-6 flex items-center gap-3">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000"
                    style={{ width: activeCard === 0 ? '75%' : '0%' }}
                  />
                </div>
                <span className="text-sm font-semibold text-primary">25% YoY</span>
              </div>
            </div>
          </Card>

          <Card
            className={`economy-card p-8 border-border/50 relative overflow-hidden cursor-pointer transition-all duration-500 ${
              activeCard === 1 ? 'scale-[1.02] shadow-xl shadow-destructive/10' : ''
            }`}
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="absolute top-1 left-6">
              <div className={`w-14 h-14 bg-destructive rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
                activeCard === 1 ? 'scale-110 -rotate-6' : ''
              }`}>
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="pt-8 relative z-10">
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
                <div className={`flex items-start gap-3 p-4 bg-destructive/5 rounded-xl border border-destructive/10 transition-all duration-300 ${
                  activeCard === 1 ? 'scale-[1.02] bg-destructive/10' : ''
                }`}>
                  <Clock className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    Creator marketing teams spend up to half their time on admin-heavy
                    tasks, with estimates showing{' '}
                    <strong>15+ hours a week lost</strong> to non-strategic work.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-heading font-bold text-destructive">80%</p>
                  <p className="text-xs text-muted-foreground">Still on Excel</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-heading font-bold text-destructive">15+</p>
                  <p className="text-xs text-muted-foreground">Hours wasted/week</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
