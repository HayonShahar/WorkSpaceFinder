import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WorkplaceItem.css';

const WorkplaceItem = ({ workplace }) => {
  return (
    // Wrap the entire WorkplaceItem in a Link component to make it clickable
    <Link to={`/workplace/${workplace.id}`} state={workplace} className="workplace-item">
      <h3>{workplace.name}</h3>
      <p><strong>Type:</strong> {workplace.type}</p>
      <p><strong>Address:</strong> {workplace.address}</p>
      <p><strong>Rating:</strong> {workplace.rating || "No rating yet"}</p>
      {workplace.image_url && <img src={workplace.image_url} alt={workplace.name} />}
    </Link>
  );
};

export default WorkplaceItem;
