import React from 'react';
import '../styles/FilterBar.css';



const FilterBar = ({ onFilterChange, workplaces }) => {
  console.log(workplaces)
  return (
    <div className="filter-bar">
      <label htmlFor="rating">Rating:</label>
      <select id="rating" onChange={onFilterChange}>
        <option value="">All Ratings</option>
        <option value="4">4+</option>
        <option value="4.5">4.5+</option>
        <option value="5">5+</option>
      </select>

      <label htmlFor="type">Type:</label>
      <select id="type" onChange={onFilterChange}>
        <option value="">All Types</option>
        <option value="coworking">Coworking</option>
        <option value="office">Office</option>
        <option value="cafe">Café</option>
        <option value="library">Library</option>
      </select>
    </div>
  );
};

export default FilterBar;
