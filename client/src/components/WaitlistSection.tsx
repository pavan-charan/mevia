import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from './AnimatedBackground';
import { Rocket, CheckCircle2, ArrowRight, Sparkles, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WaitlistSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    companySize: '',
    email: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.waitlist-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.form-field',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.waitlist-form', start: 'top 85%' },
        }
      );

      gsap.to('.floating-star', {
        y: 'random(-20, 20)',
        x: 'random(-15, 15)',
        rotation: 'random(-30, 30)',
        duration: 'random(3, 6)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.3, from: 'random' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // -----------------------
  // DROP-IN handleSubmit for Google Sheets (Apps Script)
  // -----------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Replace with your actual Google Apps Script Web App URL (deploy -> web app)
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1MOdM_0PRi0iuMGdTdWBmgShAdowg93_Z0yXDxxyrlaRM6GioTvheNjodisJDSJne/exec';

    // keep your GSAP UI shrink effect
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.2,
    });

    try {
      // Google Apps Script web app expects a POST.
      // mode: 'no-cors' is typically required so the browser will not block the request.
      // Note: with 'no-cors' you cannot read the response body; we treat success as "request completed".
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Treat as success if no exception thrown
      setIsLoading(false);
      setIsSubmitted(true);

      // your success animations
      gsap.fromTo(
        '.success-content',
        { opacity: 0, scale: 0.5, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );

      gsap.fromTo(
        '.confetti',
        { opacity: 0, y: 0, scale: 0 },
        {
          opacity: 1,
          y: 'random(-100, -200)',
          scale: 1,
          rotation: 'random(-180, 180)',
          duration: 1,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );

      console.log('Saved to Google Sheets:', formData);
    } catch (error) {
      console.error('Google Sheets submission error:', error);
      setIsLoading(false);
      // fallback UX: show an error message (you can improve with toasts)
      alert('Something went wrong — please try again.');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden"
      data-testid="section-waitlist"
    >
      <AnimatedBackground variant="circles" />

      <div className="floating-star absolute top-[15%] left-[10%] text-primary/20">
        <Star className="w-8 h-8" />
      </div>
      <div className="floating-star absolute top-[25%] right-[15%] text-primary/15">
        <Sparkles className="w-10 h-10" />
      </div>
      <div className="floating-star absolute bottom-[30%] left-[20%] text-primary/10">
        <Star className="w-6 h-6" />
      </div>
      <div className="floating-star absolute bottom-[20%] right-[25%] text-primary/20">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="waitlist-content max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-wider mb-4">
              Join the Revolution
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Join the Intelligence Revolution. <span className="text-primary">Secure Your Spot.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Initial customers will be awarded exclusive benefits.
            </p>
          </div>

          <Card className="p-6 lg:p-8 border-border/50 relative overflow-hidden bg-card/80 backdrop-blur-sm">
            {isSubmitted ? (
              <div className="success-content text-center py-8 relative">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="confetti absolute left-1/2 top-1/2 w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ['#0053A6', '#10B981', '#F59E0B', '#EC4899'][i % 4],
                      left: `${30 + Math.random() * 40}%`,
                    }}
                  />
                ))}

                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">You're on the list!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thank you for joining the Mevia revolution. We'll be in touch soon with exclusive early access benefits.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="waitlist-form space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`form-field space-y-2 transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      data-testid="input-name"
                    />
                  </div>
                  <div className={`form-field space-y-2 transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`form-field space-y-2 transition-all duration-300 ${focusedField === 'company' ? 'scale-[1.02]' : ''}`}>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      data-testid="input-company"
                    />
                  </div>
                  <div className={`form-field space-y-2 transition-all duration-300 ${focusedField === 'role' ? 'scale-[1.02]' : ''}`}>
                    <Label htmlFor="role">Your Role</Label>
                    <Input
                      id="role"
                      placeholder="Marketing Manager"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      onFocus={() => setFocusedField('role')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      data-testid="input-role"
                    />
                  </div>
                </div>

                <div className="form-field space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                  >
                    <SelectTrigger data-testid="select-company-size" className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="form-field w-full py-6 text-lg group relative overflow-hidden"
                  disabled={isLoading}
                  data-testid="button-submit-waitlist"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Rocket className="w-5 h-5 animate-bounce" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Book a Demo & Join Waitlist
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Be among the first to eliminate operational complexity and gain a true intelligence advantage.
                </p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
