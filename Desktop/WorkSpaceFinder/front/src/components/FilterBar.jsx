import React from 'react';
import '../styles/FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
  return (
    <div className="filter-bar">
      <label htmlFor="location">Location:</label>
      <select id="location" onChange={onFilterChange}>
        <option value="">All Locations</option>
        <option value="Haifa">Haifa</option>
        <option value="Tel Aviv">Tel Aviv</option>
        <option value="Jerusalim">Jerusalim</option>
        <option value="Keisaria"></option>
        <option value="Grindelwald">Grindelwald</option>
        <option value="Geneva">Geneva</option>
        <option value="Basel">Basel</option>
      </select>

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
