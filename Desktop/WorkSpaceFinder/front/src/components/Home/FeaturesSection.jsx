import React from 'react';
import '../../styles/FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <div className="features-container">
      <h2>Key Features</h2>
      <div className="features-list">
        <div className="feature-item">
          <h3>Search Workspaces</h3>
          <p>Find workspaces by type, location, and noise level.</p>
        </div>
        <div className="feature-item">
          <h3>Rate Locations</h3>
          <p>Share your experience and help others choose the best spots.</p>
        </div>
        <div className="feature-item">
          <h3>Save Favorites</h3>
          <p>Easily save and access your favorite workspaces.</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
