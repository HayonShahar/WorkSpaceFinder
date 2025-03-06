import React from 'react';

const FilterBar = ({ onFilterChange }) => {
  return (
    <div className="filter-bar">
      <label htmlFor="location">Location:</label>
      <select id="location" onChange={onFilterChange}>
        <option value="">All Locations</option>
        <option value="Zurich">Zurich</option>
        <option value="Lucerne">Lucerne</option>
        <option value="Bern">Bern</option>
        <option value="Interlaken">Interlaken</option>
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
