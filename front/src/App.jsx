import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HeroSection from './components/Home/HeroSection';
import FeaturesSection from './components/Home/FeaturesSection';
import SearchSection from './components/Home/SearchSection';
import Footer from './components/Home/Footer';
import Header from './components/Home/Header';
import AddWorkplace from './components/Add/AddWorkplace';  
import DarkModeToggle from './components/Home/DarkModeToggle';
import './App.css'; 

const App = () => {
  return (
    <Router>  {/* Wrap the whole app in Router */}
      <div>
        <Header />
        <DarkModeToggle />
        <Routes>  {/* Define routes here */}
          <Route path="/" element={
            <>
              <HeroSection />  {/* Keep Hero Section */}
              <FeaturesSection />
              <SearchSection />
            </>
          } />
          <Route path="/addworkplace" element={<AddWorkplace />} /> {/* Add the AddWorkplace route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
