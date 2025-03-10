import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 
import HomePage from './components/Home/HomePage'; 
import Footer from './components/Home/Footer';
import Header from './components/Home/Header';
import AddWorkplace from './components/Add/AddWorkplace';  
import DarkModeToggle from './components/Home/DarkModeToggle';
import ResultsPage from './pages/ResultsPage'; 
import WorkplacePage from './pages/WorkplacePage'; 
import RegisterContainer from './components/register/RegisterContainer';
import LoginContainer from './components/login/LoginContainer';
import Contact from './pages/Contact';
import './App.css'; 
import TFAContainer from './components/TFA/TFAContainer';
import PromotePage from '../src/pages/Promote'; // Import the PromotePage

const App = () => {
  const location = useLocation();

  const isExcludedPath = location.pathname.includes('/register') || location.pathname.includes('/login') || location.pathname.includes('/tfa');

  return (
    <div className='mainContainer'>
      <DarkModeToggle />
      
      {!isExcludedPath && <Header />}

      <Routes>  
        <Route path="/" element={<HomePage />} />
        <Route path="/addworkplace" element={<AddWorkplace />} /> 
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/workplace/:id" element={<WorkplacePage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/tfa" element={<TFAContainer />} />
        <Route path="/promote" element={<PromotePage />} />
      </Routes>

      {/* Render Footer only if the current path is NOT '/register', '/login', or '/tfa' */}
      {!isExcludedPath && <Footer />}
    </div>
  );
};

// Wrapper for App inside Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
