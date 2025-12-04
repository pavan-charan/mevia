import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  {
    icon: Clock,
    title: 'Payment Delays',
    description: 'Creators waiting weeks for payment.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Manual Workload',
    description: 'Drowning in Excel sheets and administrative tasks.',
  },
  {
    icon: FileText,
    title: 'Contract Headaches',
    description: 'Decentralized and risky contract management issues.',
  },
  {
    icon: MessageSquare,
    title: 'Follow-Up Fatigue',
    description: 'Endless WhatsApp threads and email chains.',
  },
  {
    icon: Eye,
    title: 'Deliverable Drop-Off',
    description: 'Large campaigns with zero visibility on tracking.',
  },
  {
    icon: Users,
    title: 'Agency Misalignment',
    description: 'Internal miscommunication and multi-agency conflicts.',
  },
  {
    icon: CheckCircle,
    title: 'Approval Bottlenecks',
    description: 'Tracking creative approvals is messy and slow.',
  },
  {
    icon: Database,
    title: 'No Central Source',
    description: 'No single dashboard for all campaign data.',
  },
  {
    icon: Calendar,
    title: 'Missed Deadlines',
    description: 'Forgetting delivery and posting schedules.',
  },
];

export default function PainPointsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pain-heading',
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

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30"
      data-testid="section-pain-points"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 pain-heading">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            We See Your Struggle
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Stop Managing Excel Sheets.
            <br />
            <span className="text-primary">Start Managing Impact.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            If you're scaling creator campaigns, you know the hidden costs of chaos. We
            engineered Mevia to eliminate the manual complexity that kills your ROI.
          </p>
        </div>

        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
          Operational Chaos We End Today
        </p>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {painPoints.map((point, index) => (
            <Card
              key={index}
              className="p-6 hover-elevate cursor-pointer transition-all duration-300 group border-border/50"
              data-testid={`card-pain-point-${index}`}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {point.title}
              </h3>
              <p className="text-muted-foreground text-sm">{point.description}</p>
            </Card>
          ))}
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
