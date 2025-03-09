import React, { useEffect, useState } from 'react';
import WorkplaceItem from '../components/WorkplaceItem';
import FilterBar from '../components/FilterBar'; // Import the filter bar component
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
    // Simulate fetching data from an API (using demo data)
    const demoWorkplaces = [
      {
        id: 1,
        name: 'Cozy Café',
        location: 'Zurich, Switzerland',
        description: 'A quiet spot with great coffee and free Wi-Fi.',
        rating: 4.5,
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/14bugatti-divo-99leadgallery-1535035005.jpg?crop=0.941xw:0.864xh;0.0423xw,0.136xh&resize=2048:*', // Placeholder image
        type: 'cafe',
        address: '123 Coffee St, Zurich, Switzerland',
      },
      {
        id: 2,
        name: 'Mountain View Office',
        location: 'Lucerne, Switzerland',
        description: 'A peaceful workspace with a beautiful view of the mountains.',
        rating: 4.7,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'office',
        address: '456 Mountain Rd, Lucerne, Switzerland',
      },
      {
        id: 3,
        name: 'Downtown Workspace',
        location: 'Bern, Switzerland',
        description: 'A modern coworking space in the heart of the city.',
        rating: 4.3,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'coworking',
        address: '789 City Center, Bern, Switzerland',
      },
      {
        id: 4,
        name: 'The Greenhouse Office',
        location: 'Interlaken, Switzerland',
        description: 'A workspace surrounded by nature with large windows and natural light.',
        rating: 4.8,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'office',
        address: '101 Green Rd, Interlaken, Switzerland',
      },
      {
        id: 5,
        name: 'Tech Lab',
        location: 'Zurich, Switzerland',
        description: 'A tech-focused co-working space for developers and entrepreneurs.',
        rating: 4.2,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'coworking',
        address: '202 Tech Blvd, Zurich, Switzerland',
      },
      {
        id: 6,
        name: 'Creative Studio',
        location: 'Geneva, Switzerland',
        description: 'A space for creative professionals with high-speed internet and plenty of outlets.',
        rating: 4.6,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'studio',
        address: '303 Creative St, Geneva, Switzerland',
      },
      {
        id: 7,
        name: 'Sky Lounge',
        location: 'Zurich, Switzerland',
        description: 'A rooftop lounge with a great view, perfect for brainstorming sessions.',
        rating: 4.4,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'lounge',
        address: '404 Sky Rd, Zurich, Switzerland',
      },
      {
        id: 8,
        name: 'Nomad Hub',
        location: 'Lucerne, Switzerland',
        description: 'A collaborative space designed for digital nomads and remote workers.',
        rating: 4.1,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'coworking',
        address: '505 Nomad Ln, Lucerne, Switzerland',
      },
      {
        id: 9,
        name: 'Urban Space',
        location: 'Bern, Switzerland',
        description: 'A modern, open-plan office in the heart of the city.',
        rating: 4.3,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'office',
        address: '606 Urban St, Bern, Switzerland',
      },
      {
        id: 10,
        name: 'Quiet Retreat',
        location: 'Grindelwald, Switzerland',
        description: 'A quiet, scenic spot in the mountains, perfect for focused work.',
        rating: 4.9,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'retreat',
        address: '707 Mountain Rd, Grindelwald, Switzerland',
      },
      {
        id: 11,
        name: 'Artisan Co-Working',
        location: 'Zurich, Switzerland',
        description: 'A rustic co-working space with artistic decor and a calm atmosphere.',
        rating: 4.6,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'coworking',
        address: '808 Artisan St, Zurich, Switzerland',
      },
      {
        id: 12,
        name: 'Business Center',
        location: 'Basel, Switzerland',
        description: 'A professional space for meetings and collaboration with all necessary amenities.',
        rating: 4.2,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
        type: 'office',
        address: '909 Business Rd, Basel, Switzerland',
      },
      // More workplaces...
    ];

    setTimeout(() => {
      setWorkplaces(demoWorkplaces);
      setFilteredWorkplaces(demoWorkplaces);
    }, 1000); // Adding a 1 second delay to simulate API call

  }, []);

  // Filter workplaces based on selected filters
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
          <div className="loader"></div> // Add a loading state or animation here
        )}
        {/* <div className="loader"></div>  */}
      </div>
    </div>
  );
};

export default ResultsPage;
