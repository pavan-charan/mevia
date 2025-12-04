import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import {
  ShoppingBag,
  Package,
  UtensilsCrossed,
  Sparkles,
  Shirt,
  Smartphone,
  Heart,
  Dumbbell,
  Home,
  Landmark,
  Play,
  GraduationCap,
  Megaphone,
  Users,
  Star,
  Globe,
  Briefcase,
  Share2,
  LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BeneficiaryItem {
  icon: LucideIcon;
  label: string;
}

const brands: BeneficiaryItem[] = [
  { icon: ShoppingBag, label: 'D2C Brands' },
  { icon: Package, label: 'FMCG' },
  { icon: UtensilsCrossed, label: 'F&B / QSR' },
  { icon: Sparkles, label: 'Beauty & Skincare' },
  { icon: Shirt, label: 'Fashion & Apparel' },
  { icon: Smartphone, label: 'Tech & Electronics' },
  { icon: Heart, label: 'Personal Care' },
  { icon: Dumbbell, label: 'Wellness & Fitness' },
  { icon: Home, label: 'Home & Decor' },
  { icon: Landmark, label: 'Finance Brands' },
  { icon: Play, label: 'OTT / Entertainment' },
  { icon: GraduationCap, label: 'EdTech' },
];

const agencies: BeneficiaryItem[] = [
  { icon: Megaphone, label: 'PR Agencies' },
  { icon: Users, label: 'Creator Marketing Agencies' },
  { icon: Star, label: 'Talent Management Firms' },
  { icon: Globe, label: 'UGC Marketplaces' },
  { icon: Briefcase, label: 'Boutique Agencies' },
  { icon: Share2, label: 'Digital Marketing Firms' },
];

export default function BeneficiariesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.beneficiaries-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.beneficiary-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: { trigger: '.beneficiaries-grid', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-background relative overflow-hidden"
      data-testid="section-beneficiaries"
    >
      <AnimatedBackground variant="dots" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 beneficiaries-heading">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            Value Beneficiaries
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Who We <span className="text-primary">Build For</span>
          </h2>
        </div>

        <div className="beneficiaries-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <BeneficiaryCarousel
            title="Brands"
            icon={ShoppingBag}
            items={brands}
            testId="brands"
          />
          <BeneficiaryCarousel
            title="Agencies"
            icon={Megaphone}
            items={agencies}
            testId="agencies"
          />
        </div>
      </div>
    </section>
  );
}

function BeneficiaryCarousel({
  title,
  icon: TitleIcon,
  items,
  testId,
}: {
  title: string;
  icon: LucideIcon;
  items: BeneficiaryItem[];
  testId: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, items.length - itemsPerView);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex, isHovered]);

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <Card
      className="beneficiary-card p-6 lg:p-8 border-border/50 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <TitleIcon className="w-4 h-4 text-primary" />
          </div>
          {title}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="h-8 w-8"
            data-testid={`${testId}-prev`}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className="h-8 w-8"
            data-testid={`${testId}-next`}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/4"
              style={{ minWidth: `calc(25% - 9px)` }}
            >
              <div
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer group"
                data-testid={`${testId}-${index}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-foreground text-xs text-center font-medium line-clamp-2">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-1 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-primary/30'
            }`}
          />
        ))}
      </div>
    </Card>
  );
}
