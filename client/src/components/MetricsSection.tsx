import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from './AnimatedBackground';
import InteractiveCard from './InteractiveCard';
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
  { value: 70, suffix: '%', prefix: '60-', label: 'Reduction in ops load', icon: TrendingDown },
  { value: 40, suffix: '%', prefix: '', label: 'Faster campaign execution', icon: Zap },
  { value: 3, suffix: '×', prefix: '', label: 'Improvement in deadline compliance', icon: Target },
  { value: 0, suffix: '', prefix: 'Zero', label: 'Payment confusion', icon: Wallet, isText: true },
];

const additionalBenefits = [
  { icon: BarChart3, text: 'Faster reporting → faster decision-making' },
  { icon: Clock, text: 'Less time spent on admin → more time spent on strategy' },
  { icon: Users, text: 'Complete transparency across teams' },
  { icon: Heart, text: 'Improved creator relationships through timely payouts & clarity' },
];

function AnimatedCounter({ value, suffix, prefix, isText }: { value: number; suffix: string; prefix: string; isText?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || isText) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2000;
            const start = Date.now();

            const animate = () => {
              const elapsed = Date.now() - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(eased * value));

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
  }, [value, isText]);

  if (isText) {
    return <span ref={ref}>{prefix}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.metric-card',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.metrics-grid', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.benefit-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.benefits-grid', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-mevia"
      className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden"
      data-testid="section-metrics"
    >
      <AnimatedBackground variant="grid" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
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

        <div className="metrics-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <InteractiveCard
              key={index}
              className="metric-card p-6 text-center border-border/50"
              data-testid={`card-metric-${index}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-8 h-8 text-primary" />
              </div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                  isText={metric.isText}
                />
              </p>
              <p className="text-muted-foreground text-sm">{metric.label}</p>
            </InteractiveCard>
          ))}
        </div>

        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {additionalBenefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-item flex items-center gap-3 p-4 rounded-lg bg-card border border-border/30 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
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
