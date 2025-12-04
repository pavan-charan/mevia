import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  LayoutDashboard,
  Users,
  FileCheck,
  Wallet,
  BarChart3,
  Building2,
  Target,
  CheckCircle2,
  Lightbulb,
  Layers,
  UserPlus,
  Settings,
  PieChart,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const brandFeatures = [
  { icon: LayoutDashboard, label: 'Campaign Management' },
  { icon: Users, label: 'Creator Management' },
  { icon: FileCheck, label: 'Deliverables & Contracts' },
  { icon: Wallet, label: 'Payments & Payouts' },
  { icon: BarChart3, label: 'Deep Analytics' },
  { icon: Building2, label: 'Simplified single-brand workspace' },
  { icon: Target, label: 'ROI context for every campaign' },
  { icon: CheckCircle2, label: 'Approval workflows' },
  { icon: Lightbulb, label: 'Creator recommendations' },
];

const agencyFeatures = [
  { icon: Layers, label: 'Multi-brand workspace' },
  { icon: LayoutDashboard, label: 'Campaign Management' },
  { icon: Users, label: 'Creator Management' },
  { icon: FileCheck, label: 'Deliverables & Contracts' },
  { icon: Wallet, label: 'Payments & Payouts' },
  { icon: BarChart3, label: 'Deep Analytics' },
  { icon: Building2, label: 'Client reporting dashboards' },
  { icon: UserPlus, label: 'Team collaboration & permissions' },
  { icon: Settings, label: 'Creator management & intelligence' },
  { icon: PieChart, label: 'Cross-brand analytics' },
];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('brands');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.features-heading',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.feature-item',
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
      }
    );
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-20 lg:py-32 bg-muted/30"
      data-testid="section-features"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 features-heading">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            Mevia Studio Features
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete toolkit for managing Creator relationships, campaigns, and
            performance.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger
              value="brands"
              className="text-base py-3"
              data-testid="tab-brands"
            >
              Brand Workspace
            </TabsTrigger>
            <TabsTrigger
              value="agencies"
              className="text-base py-3"
              data-testid="tab-agencies"
            >
              Agency Workspace
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brands">
            <Card className="p-6 lg:p-8 border-border/50">
              <p className="text-lg text-foreground mb-6">
                Everything a brand needs to run Creator campaigns — without chaos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {brandFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="feature-item flex items-center gap-3 p-3 rounded-lg bg-background border border-border/30 hover-elevate transition-all"
                    data-testid={`feature-brand-${index}`}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium text-sm">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="agencies">
            <Card className="p-6 lg:p-8 border-border/50">
              <p className="text-lg text-foreground mb-6">
                Perfect for agencies managing multiple clients.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agencyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="feature-item flex items-center gap-3 p-3 rounded-lg bg-background border border-border/30 hover-elevate transition-all"
                    data-testid={`feature-agency-${index}`}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium text-sm">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
