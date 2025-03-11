import React from 'react';
import '../../styles/FeaturesSection.css';
import { useNavigate } from 'react-router-dom';

const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <div className="features-container">
      <h2>Key Features</h2>
      <div className="features-list">
        <div className="feature-item" onClick={() => navigate("/results")}>
          <h3>Search Workspaces</h3>
          <p>Find workspaces by type, location, and noise level.</p>
        </div>
        <div className="feature-item" onClick={() => navigate("/addworkplace")}>
          <h3>Share special Locations</h3>
          <p>Share your experience and help others choose the best spots.</p>
        </div>
        <div className="feature-item" onClick={() => navigate("/promote")}>
          <h3>Promte your business!</h3>
          <p>Easily promote and earn.</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
