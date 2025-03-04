import React from 'react';
import HeroSection from './components/Home/HeroSection';
import FeaturesSection from './components/Home/FeaturesSection';
import SearchSection from './components/Home/SearchSection';
import Footer from './components/Home/Footer';
import Header from './components/Home/Header';
import './App.css'; // Import your global styles here

const App = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <SearchSection />
      <Footer />
    </div>
  );
};

export default App;
