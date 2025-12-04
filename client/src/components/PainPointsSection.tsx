import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, painPoints.length - itemsPerView);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pain-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const itemWidth = 100 / itemsPerView;
    gsap.to(trackRef.current, {
      x: `-${currentIndex * itemWidth}%`,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [currentIndex, itemsPerView]);

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
      data-testid="section-pain-points"
    >
      <AnimatedBackground variant="dots" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
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

        <div className="relative px-12">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-lg"
            onClick={goPrev}
            disabled={currentIndex === 0}
            data-testid="pain-carousel-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6"
              style={{ width: `${(painPoints.length / itemsPerView) * 100}%` }}
            >
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / painPoints.length}% - ${(6 * (painPoints.length - 1)) / painPoints.length}px)` }}
                >
                  <InteractiveCard
                    className="p-6 h-full border-border/50"
                    data-testid={`card-pain-point-${index}`}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                      <point.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{point.description}</p>
                  </InteractiveCard>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-lg"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            data-testid="pain-carousel-next"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50'
              }`}
              data-testid={`pain-dot-${index}`}
            />
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
