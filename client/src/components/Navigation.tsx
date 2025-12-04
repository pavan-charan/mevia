import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

interface NavigationProps {
  onScrollTo: (target: string) => void;
}

export default function Navigation({ onScrollTo }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.nav-item',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2 }
    );
  }, []);

  const navLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Features', href: '#features' },
    { label: 'Products', href: '#products' },
    { label: 'Why Mevia', href: '#why-mevia' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const handleNavClick = (href: string) => {
    onScrollTo(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
      data-testid="nav-main"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="nav-item flex items-center gap-2">
            <span className="text-2xl font-heading font-bold text-primary">
              Mevia
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="nav-item text-foreground/80 hover:text-primary transition-colors font-medium"
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 nav-item">
            <Button
              variant="outline"
              onClick={() => handleNavClick('#waitlist')}
              data-testid="button-book-demo"
            >
              Book a Demo
            </Button>
            <Button
              onClick={() => handleNavClick('#waitlist')}
              data-testid="button-join-waitlist"
            >
              Join Waitlist
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
                data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleNavClick('#waitlist')}
              >
                Book a Demo
              </Button>
              <Button className="w-full" onClick={() => handleNavClick('#waitlist')}>
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
