# Mevia Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium SaaS products like Linear (clean typography, sophisticated interactions), Stripe (elegant simplicity, purposeful animation), and Vercel (modern tech aesthetic). The design should convey intelligence, precision, and cutting-edge technology.

## Color System
- **Primary**: #0053A6 (Deep Blue) - Use for CTAs, accents, headings, interactive elements
- **Background**: White (#FFFFFF) - Clean, professional base
- **Text**: #0053A6 for headings, #1a1a1a for body text, #666666 for secondary text
- **Accent**: Lighter tints of #0053A6 (20% opacity) for subtle backgrounds, hover states

## Typography
- **Headings**: Inter or Poppins, bold weights (600-700)
  - H1: 3.5rem desktop / 2.5rem mobile
  - H2: 2.5rem desktop / 2rem mobile
  - H3: 1.75rem desktop / 1.5rem mobile
- **Body**: Inter or Outfit, regular (400) and medium (500)
  - Base: 1.125rem with 1.7 line-height
  - Secondary: 1rem

## Layout System
- **Container**: max-w-7xl centered with px-6 mobile, px-12 desktop
- **Spacing Units**: Use Tailwind units of 4, 8, 12, 16, 20, 24, 32 for consistent rhythm
- **Section Padding**: py-20 desktop / py-12 mobile between major sections

## Hero Section
- **Layout**: Full-height viewport (min-h-screen) with centered content
- **Background**: White with subtle gradient overlay using #0053A6 at 5% opacity radiating from top-right
- **Animation**: GSAP stagger animation - headline fades up first, then subheadline, then CTAs with 0.2s delays
- **CTA Buttons**: Primary (#0053A6 solid with white text, blur backdrop), Secondary (white with #0053A6 border and text)
- **Badge**: Floating pill above headline with #0053A6 background, white text, pulse animation

## Navigation
- **Style**: Sticky header with backdrop-blur effect, white background with subtle shadow on scroll
- **Logo**: Left-aligned, #0053A6 wordmark
- **Links**: Horizontal menu, #1a1a1a text that transitions to #0053A6 on hover
- **Mobile**: Hamburger menu with smooth slide-in drawer

## Pain Points Section (Section 3)
- **Layout**: 3-column grid desktop (grid-cols-3), single column mobile
- **Cards**: White background with subtle border, hover lifts with shadow (GSAP animation)
- **Icons**: Use Heroicons, #0053A6 fill, size-12
- **Interaction**: Cards scale to 1.05 on hover with GSAP, stagger reveal on scroll

## Metrics Section (Section 5)
- **Layout**: Grid of large stat cards, 2-column layout
- **Animation**: GSAP CountUp plugin for percentage numbers, scroll-triggered
- **Visual**: Large numbers in #0053A6, supporting text in gray
- **Background**: Light #0053A6 tint (5% opacity) section background

## Product Ecosystem Cards (Section 6)
- **Layout**: 3-column grid with equal-height cards
- **Style**: White cards with #0053A6 accent borders on top (4px)
- **Status Badges**: "LIVE NOW" in #0053A6, "COMING SOON" in gray
- **Animation**: Parallax effect using Locomotive Scroll - cards move at different speeds

## Workspace Tabs (Section 7)
- **Tab Interface**: Horizontal tabs with #0053A6 underline for active state
- **Content Transition**: GSAP fade/slide animation when switching tabs (300ms)
- **Feature List**: Checkmark icons (Heroicons) in #0053A6, 2-column layout

## Data Visualization (Section 10)
- **Growth Stats**: Large numbers with animated counting effect
- **Chart Elements**: Simple bar/line graphs using #0053A6 strokes
- **Reality Check**: Contrasting layout with bold typography

## Waitlist Form (Section 12)
- **Layout**: Centered max-w-2xl form with fields arranged vertically
- **Inputs**: White background, #0053A6 focus rings, subtle border
- **Submit Button**: Large #0053A6 button with white text, loading state animation
- **Success State**: Animated checkmark with GSAP scale and opacity effects

## Animation Strategy
- **Locomotive Scroll**: Enable smooth scrolling with data-scroll attributes on all sections
- **GSAP ScrollTrigger**: Fade-up animations for section entries, triggered at 80% viewport
- **Micro-interactions**: Button hover scale (1.02), card lifts, link underline slides
- **Performance**: Use will-change sparingly, limit concurrent animations to 3-4 elements

## Component Patterns
- **Cards**: Consistent 1.5rem padding, subtle border-radius (0.75rem), hover shadows
- **Buttons**: px-8 py-4 sizing, font-medium, rounded-lg, transition-all duration-300
- **Section Headers**: Centered with max-w-3xl, mb-16 spacing before content
- **Icons**: Consistent size-6 for inline, size-12 for feature highlights

## Responsive Behavior
- **Breakpoints**: Mobile-first, md: (768px), lg: (1024px), xl: (1280px)
- **Grid Collapse**: 3-col → 2-col → 1-col pattern for cards
- **Typography Scale**: Reduce heading sizes by 25-30% on mobile
- **Navigation**: Hamburger menu below lg breakpoint

## Images
- **Hero Section**: NO large hero image - clean typography-focused hero with animated elements
- **Product Screenshots**: Dashboard previews in Ecosystem section (1200x800px), subtle shadow, rounded corners
- **Icons/Graphics**: AI-inspired abstract graphics in #0053A6 as section dividers

## Footer
- **Layout**: 4-column grid with company info, navigation, social links, legal
- **Background**: #0053A6 with white text
- **Spacing**: py-16, comprehensive link structure