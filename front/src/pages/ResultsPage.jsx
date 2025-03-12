import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkplaceItem from '../components/WorkplaceItem';
import FilterBar from '../components/FilterBar'; 
import '../styles/ResultsPage.css';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const [workplaces, setWorkplaces] = useState([]);
  const [filteredWorkplaces, setFilteredWorkplaces] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    rating: '',
    type: '',
  });

  const navigate = useNavigate();

  function sortArrayByPromoteRollId(arr) {
    return arr.sort((a, b) => {
        const idA = a.promote?.promoteRoll?.id ?? 0;
        const idB = b.promote?.promoteRoll?.id ?? 0;
        return idB - idA; // סדר יורד
    });
}

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios.get('http://localhost:8080/api/workSpace')
      .then(response => {
        console.log(response.data);

        const sortedWorkSpaces = sortArrayByPromoteRollId(response.data.workSpaces);
        console.log(sortedWorkSpaces)

        setWorkplaces(sortedWorkSpaces);
        setFilteredWorkplaces(sortedWorkSpaces);
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

    if (rating) {
      filtered = filtered.filter(workplace => workplace.rating >= parseFloat(rating));
    }

    if (type) {
      filtered = filtered.filter(workplace => workplace.type.toLowerCase() === type.toLowerCase());
    }

    // Sort workplaces based on promoteRoll.id
    filtered = filtered.sort((a, b) => {
      const aId = a.promote?.promote?.promoteRoll?.id || 0;
      const bId = b.promote?.promote?.promoteRoll?.id || 0;
      return bId - aId; // Sort in descending order (3 -> 1)
    });

    setFilteredWorkplaces(filtered);
  };

  return (
    <div className="results-page">
      <FilterBar onFilterChange={handleFilterChange} />
      {filteredWorkplaces.length > 0 ?<h2>Available Workspaces</h2> : ''}
      <div className="workplace-list">
        {filteredWorkplaces.length > 0 ? (
          filteredWorkplaces.map((workplace) => (
            <WorkplaceItem key={workplace.id} workplace={workplace} />
          ))
        ) : (
          <div className="loader"></div> 
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
