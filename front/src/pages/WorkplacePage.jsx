import React from 'react';
import { useLocation } from 'react-router-dom'; // To get the passed state
import '../styles/WorkplacePage.css';

const WorkplacePage = () => {
  const location = useLocation(); // Get the location object
  const workplace = location.state; // Extract the workplace data passed from WorkplaceItem

  if (!workplace) return <div>Workplace not found</div>; // Handle case if workplace data is missing

  return (
    <div className="workplace-page">
      <h2>{workplace.name}</h2>
      <img src={workplace.image_url} alt={workplace.name} />
      <p><strong>Type:</strong> {workplace.type}</p>
      <p><strong>Address:</strong> {workplace.address}</p>
      <p><strong>Rating:</strong> {workplace.rating || 'No rating yet'}</p>
      <p><strong>Description:</strong> {workplace.description}</p>
    </div>
  );
};

export default WorkplacePage;
