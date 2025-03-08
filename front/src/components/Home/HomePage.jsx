import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import SearchSection from './SearchSection';
import MapComponent from '../MapComponent'; // Добавляем карту
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <SearchSection />
      <MapComponent /> {/* Карта теперь здесь */}
      <Footer />
    </div>
  );
};

export default HomePage;