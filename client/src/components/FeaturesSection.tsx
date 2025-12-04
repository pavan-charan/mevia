import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from './AnimatedBackground';
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
  LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

const brandFeatures: Feature[] = [
  { icon: LayoutDashboard, label: 'Campaign Management', description: 'End-to-end campaign orchestration' },
  { icon: Users, label: 'Creator Management', description: 'Build lasting creator relationships' },
  { icon: FileCheck, label: 'Deliverables & Contracts', description: 'Automated contract workflows' },
  { icon: Wallet, label: 'Payments & Payouts', description: 'Seamless payment processing' },
  { icon: BarChart3, label: 'Deep Analytics', description: 'Real-time performance insights' },
  { icon: Building2, label: 'Brand Workspace', description: 'Simplified single-brand view' },
  { icon: Target, label: 'ROI Tracking', description: 'Measure campaign effectiveness' },
  { icon: CheckCircle2, label: 'Approval Workflows', description: 'Streamlined content approvals' },
  { icon: Lightbulb, label: 'Creator Recommendations', description: 'AI-powered creator matching' },
];

const agencyFeatures: Feature[] = [
  { icon: Layers, label: 'Multi-brand Workspace', description: 'Manage all clients in one place' },
  { icon: LayoutDashboard, label: 'Campaign Management', description: 'Scale campaigns efficiently' },
  { icon: Users, label: 'Creator Management', description: 'Centralized creator database' },
  { icon: FileCheck, label: 'Deliverables & Contracts', description: 'Bulk contract handling' },
  { icon: Wallet, label: 'Payments & Payouts', description: 'Multi-client payment tracking' },
  { icon: BarChart3, label: 'Deep Analytics', description: 'Cross-campaign analytics' },
  { icon: Building2, label: 'Client Dashboards', description: 'White-label reporting' },
  { icon: UserPlus, label: 'Team Collaboration', description: 'Role-based permissions' },
  { icon: Settings, label: 'Creator Intelligence', description: 'Data-driven insights' },
  { icon: PieChart, label: 'Cross-brand Analytics', description: 'Portfolio performance view' },
];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('brands');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.feature-item',
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out',
      }
    );
  }, [activeTab]);

  const features = activeTab === 'brands' ? brandFeatures : agencyFeatures;

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
      data-testid="section-features"
    >
      <AnimatedBackground variant="waves" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 features-heading">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            Mevia Studio Features
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete toolkit for managing Creator relationships, campaigns, and performance.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-card">
            <TabsTrigger
              value="brands"
              className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              data-testid="tab-brands"
            >
              Brand Workspace
            </TabsTrigger>
            <TabsTrigger
              value="agencies"
              className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              data-testid="tab-agencies"
            >
              Agency Workspace
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brands">
            <Card className="p-6 lg:p-8 border-border/50 bg-card/50 backdrop-blur-sm">
              <p className="text-lg text-foreground mb-6">
                Everything a brand needs to run Creator campaigns — without chaos.
              </p>
              <FeatureGrid
                features={brandFeatures}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                prefix="brand"
              />
            </Card>
          </TabsContent>

          <TabsContent value="agencies">
            <Card className="p-6 lg:p-8 border-border/50 bg-card/50 backdrop-blur-sm">
              <p className="text-lg text-foreground mb-6">
                Perfect for agencies managing multiple clients.
              </p>
              <FeatureGrid
                features={agencyFeatures}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                prefix="agency"
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function FeatureGrid({
  features,
  hoveredIndex,
  setHoveredIndex,
  prefix,
}: {
  features: Feature[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  prefix: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`feature-item relative flex items-start gap-3 p-4 rounded-xl bg-background border border-border/30 cursor-pointer transition-all duration-300 ${
            hoveredIndex === index ? 'border-primary/50 shadow-lg shadow-primary/10 scale-[1.02]' : ''
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          data-testid={`feature-${prefix}-${index}`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              hoveredIndex === index ? 'bg-primary text-white scale-110' : 'bg-primary/10'
            }`}
          >
            <feature.icon className={`w-6 h-6 ${hoveredIndex === index ? 'text-white' : 'text-primary'}`} />
          </div>
          <div>
            <span className="text-foreground font-semibold text-sm block">{feature.label}</span>
            <span className="text-muted-foreground text-xs">{feature.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
