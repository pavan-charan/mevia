import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Smartphone, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    icon: Layers,
    title: 'Mevia Studio',
    subtitle: 'The Now',
    status: 'LIVE NOW',
    isLive: true,
    description:
      'A powerful creator-marketing workspace for brands & agencies.',
    features: [
      'Built for managing campaigns, creators, payouts, reporting & intelligence — from one place.',
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
      'Creators can access: brand deals, discovery, payments, contracts & workflow — all in one place.',
    ],
  },
  {
    icon: Palette,
    title: 'Mevia Creates',
    subtitle: 'Coming Soon',
    status: 'COMING SOON',
    isLive: false,
    description:
      'A creative command center where teams generate, create and manage content & deliverables using AI-assisted workflows.',
    features: [],
  },
];

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ecosystem-heading',
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
        const cards = cardsRef.current.children;
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, rotateX: -10 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.7,
              delay: index * 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-20 lg:py-32 bg-background"
      data-testid="section-ecosystem"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 ecosystem-heading">
          <p className="text-primary font-semibold uppercase tracking-wider mb-4">
            The Mevia Ecosystem
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Three Products. <span className="text-primary">One Mission.</span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {products.map((product, index) => (
            <Card
              key={index}
              className={`relative overflow-visible p-6 lg:p-8 border-t-4 ${
                product.isLive ? 'border-t-primary' : 'border-t-muted-foreground/30'
              } hover-elevate transition-all duration-300`}
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
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    product.isLive ? 'bg-primary/10' : 'bg-muted'
                  }`}
                >
                  <product.icon
                    className={`w-7 h-7 ${
                      product.isLive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{product.subtitle}</p>

                <p className="text-foreground/80 mb-4">{product.description}</p>

                {product.features.map((feature, fIndex) => (
                  <p key={fIndex} className="text-sm text-muted-foreground">
                    {feature}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
