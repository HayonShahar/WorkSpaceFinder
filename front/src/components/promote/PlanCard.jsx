import React from 'react';

const PlanCard = ({ plan }) => {
  return (
    <div className="plan-card">
      <h3>{plan.name}</h3>
      <p><strong>משך:</strong> {plan.duration}</p>
      <p><strong>מחיר ליום:</strong> {plan.pricePerDay}</p>
      <p>{plan.description}</p>
      <button className="select-button">בחר מסלול</button>
    </div>
  );
};

export default PlanCard;
