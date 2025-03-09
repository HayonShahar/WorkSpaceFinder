import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WorkplaceItem.css';

const WorkplaceItem = ({ workplace }) => {
  return (
    <Link to={`/workplace/${workplace.id}`} state={workplace} className="workplace-item">
      <h3 className='txtcard'>{workplace.name}</h3>
      {workplace.image_url && <img className='item-img' src={workplace.image_url} alt={workplace.name} />}
      <p className='txtcard'><strong>Type:</strong> {workplace.type}</p>
      <p className='txtcard'><strong>Address:</strong> {workplace.address}</p>
      <p className='txtcard'><strong>Rating:</strong> {workplace.rating || "No rating yet"}</p>
    </Link>
  );
};

export default WorkplaceItem;
