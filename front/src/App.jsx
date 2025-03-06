import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HeroSection from './components/Home/HeroSection';
import FeaturesSection from './components/Home/FeaturesSection';
import SearchSection from './components/Home/SearchSection';
import Footer from './components/Home/Footer';
import Header from './components/Home/Header';
import AddWorkplace from './components/Add/AddWorkplace';  
import DarkModeToggle from './components/Home/DarkModeToggle';
import ResultsPage from './pages/ResultsPage'; 
import WorkplacePage from './pages/WorkplacePage'; // Import the WorkplacePage
import './App.css'; 

const App = () => {
  return (
    <Router>  
      <div>
        <Header />
        <DarkModeToggle />
        <Routes>  
          <Route path="/" element={
            <>
              <HeroSection />  
              <FeaturesSection />
              <SearchSection />
            </>
          } />
          <Route path="/addworkplace" element={<AddWorkplace />} /> 
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/workplace/:id" element={<WorkplacePage />} /> {/* Route for WorkplacePage */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
