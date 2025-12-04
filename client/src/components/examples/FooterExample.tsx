import Footer from '../Footer';

export default function FooterExample() {
  const handleScrollTo = (target: string) => {
    console.log('Scroll to:', target);
  };

  return <Footer onScrollTo={handleScrollTo} />;
}
