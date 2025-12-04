import Navigation from '../Navigation';

export default function NavigationExample() {
  const handleScrollTo = (target: string) => {
    console.log('Scroll to:', target);
  };

  return <Navigation onScrollTo={handleScrollTo} />;
}
