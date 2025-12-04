import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  TrendingDown,
  Zap,
  Target,
  Wallet,
  BarChart3,
  Clock,
  Users,
  Heart,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: '60-70%',
    label: 'Reduction in ops load',
    icon: TrendingDown,
  },
  {
    value: '40%',
    label: 'Faster campaign execution',
    icon: Zap,
  },
  {
    value: '3×',
    label: 'Improvement in deadline compliance',
    icon: Target,
  },
  {
    value: 'Zero',
    label: 'Payment confusion',
    icon: Wallet,
  },
];

const additionalBenefits = [
  { icon: BarChart3, text: 'Faster reporting → faster decision-making' },
  { icon: Clock, text: 'Less time spent on admin → more time spent on strategy' },
  { icon: Users, text: 'Complete transparency across teams' },
  { icon: Heart, text: 'Improved creator relationships through timely payouts & clarity' },
];

export default function MetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.metrics-heading',
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

      const metrics = document.querySelectorAll('.metric-card');
      metrics.forEach((metric, index) => {
        gsap.fromTo(
          metric,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: metric,
              start: 'top 85%',
            },
          }
        );

        const valueEl = metric.querySelector('.metric-value');
        if (valueEl) {
          const value = valueEl.textContent || '';
          const numMatch = value.match(/\d+/);
          if (numMatch) {
            const targetNum = parseInt(numMatch[0]);
            const obj = { val: 0 };
            gsap.to(obj, {
              val: targetNum,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: metric,
                start: 'top 85%',
              },
              onUpdate: () => {
                if (valueEl) {
                  valueEl.textContent = value.replace(/\d+/, Math.round(obj.val).toString());
                }
              },
            });
          }
        }
      });

      gsap.fromTo(
        '.benefit-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.benefits-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-mevia"
      className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background"
      data-testid="section-metrics"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 metrics-heading">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            Why Adopting Mevia Studio Changes Everything
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Reduce operations time.
            <br />
            Boost team efficiency. <span className="text-primary">Achieve real ROI.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="metric-card p-6 text-center hover-elevate transition-all duration-300 border-border/50"
              data-testid={`card-metric-${index}`}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="metric-value text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                {metric.value}
              </p>
              <p className="text-muted-foreground text-sm">{metric.label}</p>
            </Card>
          ))}
        </div>

        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {additionalBenefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-item flex items-center gap-3 p-4 rounded-lg bg-card border border-border/30"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground text-sm font-medium">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
