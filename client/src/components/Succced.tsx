import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import {
  LayoutDashboard,
  Users,
  FileCheck,
  Wallet,
  BarChart3,
  Building2,
  Instagram,
  Youtube,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* SnapchatIcon omitted for brevity — keep your existing implementation */
const SnapchatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.5c-2.7 0-4.7 1.9-4.7 5 0 1.4.4 2.3.4 2.3s-.2.9-.4 1.4c-.6 1.5-2.2 1.6-2.2 2.4 0 .7 1.2 1.3 2.3 1.6.4.1.8.2 1.1.4.4.3.3.9.6 1.3.5.7 1.5.9 2.4.9s1.9-.2 2.4-.9c.3-.4.2-1 .6-1.3.3-.2.7-.3 1.1-.4 1.1-.3 2.3-.9 2.3-1.6 0-.8-1.6-.9-2.2-2.4-.2-.5-.4-1.4-.4-1.4s.4-.9.4-2.3c0-3.1-2-5-4.7-5z" />
  </svg>
);

type IconComponent = React.ComponentType<{ className?: string }>;

const features: {
  icon: IconComponent;
  title: string;
  bullets: string[];
  chips?: { label: string; Icon: IconComponent }[];
}[] = [
  { icon: LayoutDashboard, title: 'Campaign Management', bullets: ['Timeline visualization', 'Progress tracking', 'Task assignments', 'Team comments'] },
  {
    icon: Users, title: 'Influencer Management', bullets: ['CSV bulk import', 'Profile enrichment', 'Manual creation', 'Smart search'],
    chips: [{ label: 'Instagram', Icon: Instagram }, { label: 'YouTube', Icon: Youtube }, { label: 'Snapchat', Icon: SnapchatIcon }],
  },
  { icon: FileCheck, title: 'Deliverables & Contracts', bullets: ['Kanban boards', 'Version control', 'Contract storage', 'Approval flows'] },
  { icon: Wallet, title: 'Payments & Payouts', bullets: ['Invoice tracking', 'Payment history', 'Payout management', 'Status filters'] },
  { icon: BarChart3, title: 'Deep Analytics', bullets: ['Audience insights', 'Demographics', 'Engagement rates', 'Performance trends'] },
  { icon: Building2, title: 'Brand Workspace', bullets: ['Brief management', 'Team collaboration', 'Central storage', 'Approval flows'] },
];

const blueGradients = [
  'from-blue-600 to-sky-400',
  'from-sky-600 to-blue-400',
  'from-indigo-600 to-sky-400',
  'from-blue-700 to-indigo-400',
  'from-sky-600 to-indigo-500',
  'from-blue-600 to-cyan-400',
];

export default function Succeed(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1) Ensure clean initial states (so tailwind .opacity-0 or other CSS doesn't block GSAP)
      gsap.set('.succeed-heading', { opacity: 0, y: 18, scale: 0.995 });
      gsap.set('.succeed-desc', { opacity: 0, y: 12 });
      gsap.set('.feature-card', { opacity: 0, y: 30, scale: 0.995 });
      gsap.set('.feature-chip', { opacity: 0, y: 6 });
      gsap.set('.feature-bullet', { opacity: 0, x: -8 });

      // 2) Heading timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          // markers: true, // enable for debugging
        }
      })
      .to('.succeed-heading', { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, 0)
      .to('.succeed-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.06);

      // 3) Cards staggered timeline: single timeline for reliability
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          // markers: true,
        }
      });

      cardsTl.to('.feature-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.12,
      });

      // 4) inside-card micro animations triggered when each card enters view
      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card) => {
        const chips = card.querySelectorAll('.feature-chip');
        const bullets = card.querySelectorAll('.feature-bullet');

        // chips appear shortly after the card (local timeline tied to card scroll)
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          }
        }).to(chips, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' });

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          }
        }).to(bullets, { opacity: 1, x: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' });
      });

      // 5) hover micro-interactions for icon tiles
      gsap.utils.toArray<HTMLElement>('.feature-icon-tile').forEach((tile) => {
        const enter = () => gsap.to(tile, { scale: 1.06, rotation: 1.2, duration: 0.22, ease: 'power2.out' });
        const leave = () => gsap.to(tile, { scale: 1, rotation: 0, duration: 0.38, ease: 'power3.out' });
        tile.addEventListener('mouseenter', enter);
        tile.addEventListener('mouseleave', leave);
        // note: context revert will remove these listeners
      });

      // 6) refresh to ensure ScrollTrigger measures correctly
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="succeed" className="py-20 lg:py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="succeed-heading font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Everything You Need to <span className="text-primary">Succeed</span>
        </h2>

        <p className="succeed-desc text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
          A complete toolkit for managing influencer relationships, campaigns, and performance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Gradient = blueGradients[i % blueGradients.length];
            const Icon = f.icon;
            return (
              <Card key={i} className="feature-card p-6 lg:p-8 border-border/30 bg-card/50 backdrop-blur-sm rounded-2xl shadow-2xl text-left">
                <div className="flex items-start gap-4">
                  <div className={`feature-icon-tile relative w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${Gradient} text-white shadow-md ring-1 ring-white/8`} aria-hidden>
                    <svg className="absolute -top-3 -right-4 opacity-15 pointer-events-none" width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8C24 0 44 -2 52 10C60 22 56 40 44 48C32 56 10 52 6 40C2 28 8 16 16 8Z" fill="white" />
                    </svg>
                    <Icon className="w-6 h-6 text-white stroke-[1.7]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  </div>
                </div>

                {f.chips && (
                  <div className="flex gap-1 mt-4 flex-wrap">
                    {f.chips.map((c, idx) => {
                      const ChipIcon = c.Icon;
                      return (
                        <span key={idx} className="feature-chip flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium">
                          <ChipIcon className="w-3.5 h-3.5 text-primary" />
                          {c.label}
                        </span>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  {f.bullets.map((b, idx) => (
                    <div key={idx} className="feature-bullet flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary/40" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
