import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WorkplaceItem.css';

const WorkplaceItem = ({ workplace }) => {
  console.log(workplace);
 const promote = workplace.promote?.promoteRoll.role || '';
  
  return (
    <Link to={`/workplace/${workplace.id}`} state={workplace} className={`workplace-item`} id={`${promote}`}>
      <span id={`${promote}`}>{promote}</span>
      <h3>{workplace.name}</h3>
      {workplace.imageUrl && <img className='item-img' src={workplace.imageUrl} alt={workplace.name} />}
      <p><strong>Type:</strong> {workplace.type}</p>
      <p><strong>Address:</strong> {workplace.address}</p>
      <p><strong>Rating:</strong> {workplace.rating || "No rating yet"}</p>
    </Link>
  );
};

export default WorkplaceItem;
