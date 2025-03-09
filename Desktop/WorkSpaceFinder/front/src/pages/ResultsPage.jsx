import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import WorkplaceItem from '../components/WorkplaceItem';
import FilterBar from '../components/FilterBar';
import '../styles/ResultsPage.css';

const ResultsPage = () => {
  const [workplaces, setWorkplaces] = useState([]);
  const [filteredWorkplaces, setFilteredWorkplaces] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    rating: '',
    type: '', 
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/workSpace')
      .then(response => {
        console.log(response.data);
        
        setWorkplaces(response.data.workSpaces);
        setFilteredWorkplaces(response.data.workSpaces);
      })
      .catch(error => {
        console.error('Error uploading data:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;

    setFilters(prevState => {
      const newFilters = { ...prevState, [id]: value };
      filterWorkplaces(newFilters);
      return newFilters;
    });
  };

  const filterWorkplaces = (filters) => {
    const { location, rating, type } = filters;
    let filtered = workplaces;

    if (location) {
      filtered = filtered.filter(workplace =>
        workplace.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (rating) {
      filtered = filtered.filter(workplace => workplace.rating >= parseFloat(rating));
    }

    if (type) {
      filtered = filtered.filter(workplace => workplace.type.toLowerCase() === type.toLowerCase());
    }

    setFilteredWorkplaces(filtered);
  };

  return (
    <div className="results-page">
      <FilterBar onFilterChange={handleFilterChange} />
      <h2>Available Workspaces</h2>
      <div className="workplace-list">
        {filteredWorkplaces.length > 0 ? (
          filteredWorkplaces.map((workplace) => (
            <WorkplaceItem key={workplace.id} workplace={workplace} />
          ))
        ) : (
          <div className="loader">Loading...</div> // Show loading text
        )}
      </div>
    </div>
  );
};

export default ResultsPage;