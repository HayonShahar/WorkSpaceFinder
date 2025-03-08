import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './components/Home/HomePage'; // Импортируем HomePage
import Footer from './components/Home/Footer';
import Header from './components/Home/Header';
import AddWorkplace from './components/Add/AddWorkplace';  
import DarkModeToggle from './components/Home/DarkModeToggle';
import ResultsPage from './pages/ResultsPage'; 
import WorkplacePage from './pages/WorkplacePage'; 
import './App.css'; 

const App = () => {
  return (
    <Router>  
      <div>
        <Header />
        <DarkModeToggle />
        <Routes>  
          <Route path="/" element={<HomePage />} /> {/* Используем HomePage */}
          <Route path="/addworkplace" element={<AddWorkplace />} /> 
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/workplace/:id" element={<WorkplacePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;