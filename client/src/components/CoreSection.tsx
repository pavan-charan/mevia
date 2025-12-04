import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Zap, Target, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CoreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.core-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.core-icon',
        { opacity: 0, scale: 0.8, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.core-icons',
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
      className="py-20 lg:py-32 bg-primary text-white relative overflow-hidden"
      data-testid="section-core"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center core-content">
          <p className="text-white/80 font-semibold uppercase tracking-wider mb-4">
            Our Driving Force
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our Core: Creator Intelligence & Automation
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Mevia is not just a tool; we are your dedicated intelligence layer. We are a
            team marching toward a future where creator marketing is entirely streamlined,
            predictable, and measurable.
          </p>
        </div>

        <div className="core-icons grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { icon: Brain, label: 'Intelligence' },
            { icon: Zap, label: 'Automation' },
            { icon: Target, label: 'Precision' },
            { icon: TrendingUp, label: 'Growth' },
          ].map((item, index) => (
            <div
              key={index}
              className="core-icon flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <span className="font-medium text-white/90">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
