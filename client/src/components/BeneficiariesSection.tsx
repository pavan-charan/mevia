import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
          <BeneficiaryRadial
            title="Brands"
            icon={ShoppingBag}
            items={brands}
            testId="brands"
          />
          <BeneficiaryRadial
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
function BeneficiaryRadial({
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
  // Unique radial layout: items arranged around a center badge.
  // On small screens, fall back to a simple grid of chips.
  const radius = 80; // percent of the card width used for radial placement on large screens

  return (
    <Card className="beneficiary-card p-6 lg:p-8 border-border/50 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <TitleIcon className="w-4 h-4 text-primary" />
          </div>
          {title}
        </h3>
      </div>

      <div className="flex flex-col items-center">
        {/* Center badge */}
        

        {/* Decorative mosaic grid to avoid overlap */}
        <div className="w-full mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((item, i) => (
              <div key={i} data-testid={`${testId}-${i}`} className="p-1">
                <div className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary/10 transition-all duration-200 cursor-pointer ${i % 7 === 0 ? 'lg:col-span-2' : ''}`}>
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
      </div>
    </Card>
  );
}
