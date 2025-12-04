import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCard from './InteractiveCard';
import AnimatedBackground from './AnimatedBackground';
import {
  Clock,
  FileSpreadsheet,
  FileText,
  MessageSquare,
  Eye,
  Users,
  CheckCircle,
  Database,
  Calendar,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  { icon: Clock, title: 'Payment Delays', description: 'Creators waiting weeks for payment.' },
  { icon: FileSpreadsheet, title: 'Manual Workload', description: 'Drowning in Excel sheets and administrative tasks.' },
  { icon: FileText, title: 'Contract Headaches', description: 'Decentralized and risky contract management issues.' },
  { icon: MessageSquare, title: 'Follow-Up Fatigue', description: 'Endless WhatsApp threads and email chains.' },
  { icon: Eye, title: 'Deliverable Drop-Off', description: 'Large campaigns with zero visibility on tracking.' },
  { icon: Users, title: 'Agency Misalignment', description: 'Internal miscommunication and multi-agency conflicts.' },
  { icon: CheckCircle, title: 'Approval Bottlenecks', description: 'Tracking creative approvals is messy and slow.' },
  { icon: Database, title: 'No Central Source', description: 'No single dashboard for all campaign data.' },
  { icon: Calendar, title: 'Missed Deadlines', description: 'Forgetting delivery and posting schedules.' },
];

export default function PainPointsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Clear/ensure initial states so Tailwind doesn't fight GSAP
      gsap.set('.pain-heading', { opacity: 0, y: 40 });
      gsap.set('.pain-sub', { opacity: 0, y: 18 });
      gsap.set('.pain-note', { opacity: 0, y: 12 });
      gsap.set('.pain-card', { opacity: 0, y: 30, scale: 0.995 });
      gsap.set('.pain-icon', { scale: 0.98, y: 0, opacity: 0 });
      gsap.set('.pain-title', { y: 6, opacity: 0 });
      gsap.set('.pain-desc', { x: -8, opacity: 0 });

      // Heading timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          // markers: true,
        },
      })
      .to('.pain-heading', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0)
      .to('.pain-sub', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.08)
      .to('.pain-note', { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.14);

      // Cards stagger timeline (single timeline for reliability)
      const cardsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          // markers: true,
        },
      });

      cardsTimeline.to('.pain-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { each: 0.12, from: 'start' },
      });

      // Per-card micro animations (icons, titles, desc)
      gsap.utils.toArray<HTMLElement>('.pain-card').forEach((card) => {
        const icon = card.querySelectorAll<HTMLElement>('.pain-icon');
        const title = card.querySelectorAll<HTMLElement>('.pain-title');
        const desc = card.querySelectorAll<HTMLElement>('.pain-desc');

        // local timeline when the card enters view
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        })
        .to(icon, { opacity: 1, scale: 1.02, duration: 0.36, ease: 'power2.out' })
        .to(title, { y: 0, opacity: 1, duration: 0.32, ease: 'power2.out' }, '-=0.18')
        .to(desc, { x: 0, opacity: 1, duration: 0.34, ease: 'power2.out' }, '-=0.26');
      });

      // Hover micro-interactions for each card: gentle lift & shadow
      gsap.utils.toArray<HTMLElement>('.pain-card').forEach((card) => {
        const enter = () => gsap.to(card, { y: -6, boxShadow: '0 18px 40px rgba(2,6,23,0.12)', duration: 0.28, ease: 'power2.out' });
        const leave = () => gsap.to(card, { y: 0, boxShadow: '0 6px 18px rgba(2,6,23,0.06)', duration: 0.45, ease: 'power3.out' });

        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);

        // for keyboard accessibility: focus / blur
        card.addEventListener('focusin', enter);
        card.addEventListener('focusout', leave);
      });

      // Refresh ScrollTrigger measurements
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
      data-testid="section-pain-points"
    >
      <AnimatedBackground variant="dots" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="pain-heading">
            <p className="text-primary font-semibold uppercase tracking-wider mb-4">
              We See Your Struggle
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Stop Managing Excel Sheets.
              <br />
              <span className="text-primary">Start Managing Impact.</span>
            </h2>
          </div>

          <p className="pain-sub text-muted-foreground text-lg max-w-2xl mx-auto">
            If you're scaling creator campaigns, you know the hidden costs of chaos. We
            engineered Mevia to eliminate the manual complexity that kills your ROI.
          </p>
        </div>

        <p className="pain-note text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
          Operational Chaos We End Today
        </p>

        <div className="relative px-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <InteractiveCard
                  key={index}
                  tabIndex={0}
                  className="pain-card p-6 h-full border-border/50"
                  data-testid={`card-pain-point-${index}`}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300 pain-icon">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 pain-title">
                    {point.title}
                  </h3>

                  <p className="text-muted-foreground text-sm pain-desc">{point.description}</p>
                </InteractiveCard>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl font-heading font-semibold text-primary">
            Mevia fixes everything — at once.
          </p>
        </div>
      </div>
    </section>
  );
}
