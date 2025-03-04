import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import SearchSection from './SearchSection';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <SearchSection />
      <Footer />
    </div>
  );
};

export default HomePage;
