import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedBackgroundProps {
  variant?: 'dots' | 'circles' | 'grid' | 'waves';
  className?: string;
}

export default function AnimatedBackground({ variant = 'circles', className = '' }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (variant === 'circles') {
        gsap.to('.floating-circle', {
          y: 'random(-30, 30)',
          x: 'random(-20, 20)',
          rotation: 'random(-15, 15)',
          duration: 'random(4, 8)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.5,
            from: 'random',
          },
        });
      }

      if (variant === 'dots') {
        gsap.to('.floating-dot', {
          scale: 'random(0.8, 1.2)',
          opacity: 'random(0.3, 0.8)',
          duration: 'random(2, 4)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.1,
            from: 'random',
          },
        });
      }

      if (variant === 'waves') {
        gsap.to('.wave-line', {
          attr: { d: 'M0,50 Q250,20 500,50 T1000,50' },
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [variant]);

  if (variant === 'circles') {
    return (
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="floating-circle absolute top-[10%] left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="floating-circle absolute top-[60%] right-[15%] w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="floating-circle absolute bottom-[20%] left-[30%] w-48 h-48 bg-primary/4 rounded-full blur-2xl" />
        <div className="floating-circle absolute top-[40%] right-[40%] w-32 h-32 bg-primary/6 rounded-full blur-xl" />
        <div className="floating-circle absolute bottom-[40%] right-[20%] w-56 h-56 bg-primary/3 rounded-full blur-2xl" />
      </div>
    );
  }

  if (variant === 'dots') {
    const dots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    return (
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="floating-dot absolute bg-primary rounded-full"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="floating-circle absolute top-[20%] left-[20%] w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        <div className="floating-circle absolute bottom-[30%] right-[25%] w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
      </div>
    );
  }

  if (variant === 'waves') {
    return (
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg className="absolute bottom-0 left-0 w-full h-40 opacity-10" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            className="wave-line"
            d="M0,50 Q250,80 500,50 T1000,50"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          <path
            className="wave-line"
            d="M0,60 Q250,30 500,60 T1000,60"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <path
            className="wave-line"
            d="M0,70 Q250,100 500,70 T1000,70"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>
    );
  }

  return null;
}
