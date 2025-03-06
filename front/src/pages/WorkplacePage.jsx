import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/WorkplacePage.css';

const WorkplacePage = () => {
  const location = useLocation(); // Get the location object from React Router
  const workplace = location.state; // Retrieve the workplace data passed via state

  return (
    <div className="workplace-page">
      {workplace ? (
        <>
          <h1>{workplace.name}</h1>
          <p><strong>Type:</strong> {workplace.type}</p>
          <p><strong>Address:</strong> {workplace.address}</p>
          <p><strong>Rating:</strong> {workplace.rating || "No rating yet"}</p>
          <p><strong>Description:</strong> {workplace.description}</p>
          {/* Display the image */}
          {workplace.imageUrl && <img src={workplace.imageUrl} alt={workplace.name} />}
        </>
      ) : (
        <p>Workplace not found</p>
      )}
    </div>
  );
};

export default WorkplacePage;
