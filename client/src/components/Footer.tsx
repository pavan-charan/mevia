import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Instagram, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onScrollTo: (target: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        }
      );

      gsap.to('.footer-wave', {
        x: '-50%',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    products: [
      { label: 'Mevia Studio', href: '#products' },
      { label: 'Mevia App', href: '#products' },
      { label: 'Mevia Creates', href: '#products' },
    ],
    solutions: [
      { label: 'For Brands', href: '#features' },
      { label: 'For Agencies', href: '#features' },
      { label: 'Enterprise', href: '#waitlist' },
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: 'mailto:hello@mevia.io', label: 'Email' },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-primary text-white py-16 relative overflow-hidden"
      data-testid="footer"
    >
      <div className="absolute bottom-0 left-0 w-[200%] h-20 opacity-10">
        <svg className="footer-wave w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q250,0 500,50 T1000,50 T1500,50 T2000,50"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 footer-content relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <span className="text-2xl font-heading font-bold">Mevia</span>
            <p className="text-white/80 mt-3 text-sm leading-relaxed max-w-xs">
              The Unified Operating System for the Entire Creator Ecosystem.
            </p>
            <div className="flex items-center gap-2 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                  data-testid={`link-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onScrollTo(link.href)}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onScrollTo(link.href)}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Mevia. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Made with intelligence for the creator economy.
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className={`fixed bottom-6 right-6 z-50 bg-primary border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        onClick={scrollToTop}
        data-testid="button-scroll-top"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  );
}
