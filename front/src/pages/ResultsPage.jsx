import React, { useEffect, useState } from 'react';
import WorkplaceItem from '../components/WorkplaceItem';
import '../styles/ResultsPage.css';

const ResultsPage = () => {
  const [workplaces, setWorkplaces] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/workplaces'); // Adjust API URL
        const data = await response.json();
        setWorkplaces(data);
      } catch (error) {
        console.error('Error fetching workplaces:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="results-page">
      <h2>Available Workspaces</h2>
      <div className="workplace-list">
        {workplaces.length > 0 ? (
          workplaces.map((workplace) => (
            <WorkplaceItem key={workplace.id} workplace={workplace} />
          ))
        ) : (
          <p>Loading workspaces...</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
