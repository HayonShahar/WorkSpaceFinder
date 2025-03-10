import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import '../styles/WorkplaceItem.css';

const WorkplaceItem = ({ workplace }) => {
  const [warning, setWarning] = useState(false);

  const handleHeartClick = (e) => {
    e.preventDefault(); // Чтобы клик по кнопке не вел к переходу по ссылке
    alert(`You clicked the heart for ${workplace.name}!`);
    setWarning(true);
    setTimeout(() => setWarning(false), 2000);
  };

  return (
    <Link to={`/workplace/${workplace.id}`} state={workplace} className="workplace-item" id="workplace-item">
      <h3 className="txtcard">{workplace.name}</h3>
      {workplace.image_url && <img className="item-img" src={workplace.image_url} alt={workplace.name} />}
      <p className="txtcard"><strong>Type:</strong> {workplace.type}</p>
      <p className="txtcard"><strong>Address:</strong> {workplace.address}</p>
      <p className="txtcard"><strong>Rating:</strong> {workplace.rating || "No rating yet"}</p>

      <button id="heart-btn" onClick={handleHeartClick}>
        <FontAwesomeIcon icon={faHeart} />
      </button>

      {warning && <p className="warning-message">You clicked the heart for {workplace.name}!</p>}
    </Link>
  );
};

export default WorkplaceItem;