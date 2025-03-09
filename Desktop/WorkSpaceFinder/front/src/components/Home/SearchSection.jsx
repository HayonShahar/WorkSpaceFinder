import React, { useState } from 'react';
import '../../styles/SearchSection.css';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Call an API or route to a search page
  };

  return (
    <div className="search-container">
      <h2>Find Your Ideal Workspace</h2>
      <input
        type="text"
        placeholder="Search by type or location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchSection;
