import React, { useState } from 'react';
import '../styles/Promote.css';

const PromotionBox = ({ title, description, price, onClick }) => {
  return (
    <div className="promotion-box" onClick={onClick}>
      <div className="card">
        <div className="first-content">
          <span>{title}</span>
        </div>
        <div className="second-content">
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p className="price">${price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function PromotePage() {
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const promotions = [
    {
      id: 1,
      title: 'Basic Promotion',
      description: 'Get basic visibility.',
      price: 5,
    },
    {
      id: 2,
      title: 'Standard Promotion',
      description: 'Get medium visibility and additional features.',
      price: 10,
    },
    {
      id: 3,
      title: 'Premium Promotion',
      description: 'Get maximum visibility and exclusive features.',
      price: 20,
    },
  ];

  const handlePromotionClick = (promotion) => {
    setSelectedPromotion(promotion);
  };

  const handleConfirmSelection = () => {
    alert(`You have selected the ${selectedPromotion.title} for $${selectedPromotion.price}`);
    // Add any further logic, like submitting to backend, etc.
  };

  return (
    <div className="promote-page">
      <h2>Select a Promotion</h2>
      <div className="promotion-list">
        {promotions.map((promotion) => (
          <PromotionBox
            key={promotion.id}
            title={promotion.title}
            description={promotion.description}
            price={promotion.price}
            onClick={() => handlePromotionClick(promotion)}
          />
        ))}
      </div>
      {selectedPromotion && (
        <div className="selected-promotion">
          <h3>Selected Promotion:</h3>
          <p><strong>{selectedPromotion.title}</strong></p>
          <p>{selectedPromotion.description}</p>
          <p className="price">Price: ${selectedPromotion.price.toFixed(2)}</p>
          <button onClick={handleConfirmSelection}>Confirm Selection</button>
        </div>
      )}
    </div>
  );
}

export default PromotePage;
