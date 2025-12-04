import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  const handleScrollTo = (target: string) => {
    console.log('Scroll to:', target);
  };

  return <HeroSection onScrollTo={handleScrollTo} />;
}
