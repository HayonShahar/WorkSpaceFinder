import React, { useEffect } from 'react';
import '../../styles/HeroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  const isConnected = () => {
    const token = localStorage.getItem("token");
    if(!token){
      return true;
    }    
    return false;
  }
  
    useEffect(() => {
      isConnected();
    },[])

  return (
    <div className="hero-container">
      <h1>Find Quiet Workspaces Near You</h1>
      <p>Discover peaceful spots to work, from cafes to nature corners.</p>

      {isConnected() && <button className="cta-button" onClick={() => navigate("/login")}>Get Started</button>}
    </div>
  );
};

export default HeroSection;
