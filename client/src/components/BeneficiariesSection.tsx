import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { icon: ShoppingBag, label: 'D2C Brands' },
  { icon: Package, label: 'FMCG' },
  { icon: UtensilsCrossed, label: 'F&B / QSR' },
  { icon: Sparkles, label: 'Beauty & Skincare' },
  { icon: Shirt, label: 'Fashion & Apparel' },
  { icon: Smartphone, label: 'Tech Gadgets & Consumer Electronics' },
  { icon: Heart, label: 'Personal Care' },
  { icon: Dumbbell, label: 'Wellness & Fitness' },
  { icon: Home, label: 'Home & Decor' },
  { icon: Landmark, label: 'Finance Brands doing Creator content' },
  { icon: Play, label: 'OTT / Entertainment' },
  { icon: GraduationCap, label: 'EdTech using creators' },
];

const agencies = [
  { icon: Megaphone, label: 'PR Agencies' },
  { icon: Users, label: 'Creator Marketing Agencies' },
  { icon: Star, label: 'Talent Management Firms' },
  { icon: Globe, label: 'UGC Creator Marketplaces' },
  { icon: Briefcase, label: 'Boutique Agencies' },
  { icon: Share2, label: 'Social media & digital marketing firms' },
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
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.brand-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.brands-grid',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.agency-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.agencies-grid',
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
      className="py-20 lg:py-32 bg-background"
      data-testid="section-beneficiaries"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 beneficiaries-heading">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            Value Beneficiaries
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Who We <span className="text-primary">Build For</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <Card className="p-6 lg:p-8 border-border/50">
            <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-primary" />
              </div>
              Brands
            </h3>
            <div className="brands-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="brand-item flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover-elevate transition-all"
                  data-testid={`brand-${index}`}
                >
                  <brand.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{brand.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 lg:p-8 border-border/50">
            <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Megaphone className="w-4 h-4 text-primary" />
              </div>
              Agencies
            </h3>
            <div className="agencies-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agencies.map((agency, index) => (
                <div
                  key={index}
                  className="agency-item flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover-elevate transition-all"
                  data-testid={`agency-${index}`}
                >
                  <agency.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{agency.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
