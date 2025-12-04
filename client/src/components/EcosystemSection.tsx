import { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Layers, Smartphone, Palette, ArrowRight } from 'lucide-react';
import InteractiveCard from './InteractiveCard';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    icon: Layers,
    title: 'Mevia Studio',
    subtitle: 'The Now',
    status: 'LIVE NOW',
    isLive: true,
    description: 'A powerful creator-marketing workspace for brands & agencies.',
    features: [
      'Campaign management from start to finish',
      'Creator onboarding & relationship tracking',
      'Automated payouts & contract handling',
      'Real-time reporting & analytics',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mevia App',
    subtitle: 'Coming Soon',
    status: 'COMING SOON',
    isLive: false,
    description: 'A dedicated app for creators across the ecosystem.',
    features: [
      'Access brand deals instantly',
      'Manage payments & contracts',
      'Track deliverables & deadlines',
      'Build your creator portfolio',
    ],
  },
  {
    icon: Palette,
    title: 'Mevia Creates',
    subtitle: 'Coming Soon',
    status: 'COMING SOON',
    isLive: false,
    description: 'Creative command center with AI-assisted workflows.',
    features: [
      'AI-powered content generation',
      'Brand asset management',
      'Collaborative editing tools',
      'Deliverable templates & automation',
    ],
  },
];

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ecosystem-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      if (!isMobile) {
        gsap.fromTo(
          '.product-card',
          { opacity: 0, y: 60, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.products-grid', start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % products.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-20 lg:py-32 bg-background relative overflow-hidden"
      data-testid="section-ecosystem"
    >
      <AnimatedBackground variant="circles" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 ecosystem-heading">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            The Mevia Ecosystem
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Three Products. <span className="text-primary">One Mission.</span>
          </h2>
        </div>

        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {products.map((product, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={goPrev} data-testid="ecosystem-prev">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/30'
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={goNext} data-testid="ecosystem-next">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="products-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <InteractiveCard
      className={`product-card relative p-6 lg:p-8 border-t-4 h-full ${
        product.isLive ? 'border-t-primary' : 'border-t-muted-foreground/30'
      }`}
      data-testid={`card-product-${index}`}
    >
      <Badge
        variant={product.isLive ? 'default' : 'secondary'}
        className="absolute -top-3 left-6"
      >
        {product.status}
      </Badge>

      <div className="mt-4">
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
            product.isLive ? 'bg-primary/10' : 'bg-muted'
          }`}
        >
          <product.icon
            className={`w-8 h-8 ${product.isLive ? 'text-primary' : 'text-muted-foreground'}`}
          />
        </div>

        <h3 className="font-heading text-xl font-bold text-foreground mb-1">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{product.subtitle}</p>
        <p className="text-foreground/80 mb-6">{product.description}</p>

        <ul className="space-y-2 mb-6">
          {product.features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>

        {product.isLive && (
          <Button className="w-full group">
            Get Started
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>
    </InteractiveCard>
  );
}
