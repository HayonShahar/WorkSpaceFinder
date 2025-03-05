// import React, { useEffect, useState } from 'react';
// import WorkplaceItem from '../components/WorkplaceItem';
// import '../styles/ResultsPage.css';

// const ResultsPage = () => {
//   const [workplaces, setWorkplaces] = useState([]);

//   useEffect(() => {
//     // Simulate fetching data from an API
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/workplaces'); // Adjust API URL
//         const data = await response.json();
//         setWorkplaces(data);
//       } catch (error) {
//         console.error('Error fetching workplaces:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="results-page">
//       <h2>Available Workspaces</h2>
//       <div className="workplace-list">
//         {workplaces.length > 0 ? (
//           workplaces.map((workplace) => (
//             <WorkplaceItem key={workplace.id} workplace={workplace} />
//           ))
//         ) : (
//           <p>Loading workspaces...</p>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import WorkplaceItem from '../components/WorkplaceItem';
import '../styles/ResultsPage.css';

const ResultsPage = () => {
  const [workplaces, setWorkplaces] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API (using demo data)
    const demoWorkplaces = [
      {
        id: 1,
        name: 'Cozy Café',
        location: 'Zurich, Switzerland',
        description: 'A quiet spot with great coffee and free Wi-Fi.',
        rating: 4.5,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 2,
        name: 'Mountain View Office',
        location: 'Lucerne, Switzerland',
        description: 'A peaceful workspace with a beautiful view of the mountains.',
        rating: 4.7,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 3,
        name: 'Downtown Workspace',
        location: 'Bern, Switzerland',
        description: 'A modern coworking space in the heart of the city.',
        rating: 4.3,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 4,
        name: 'The Greenhouse Office',
        location: 'Interlaken, Switzerland',
        description: 'A workspace surrounded by nature with large windows and natural light.',
        rating: 4.8,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 5,
        name: 'Tech Lab',
        location: 'Zurich, Switzerland',
        description: 'A tech-focused co-working space for developers and entrepreneurs.',
        rating: 4.2,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 6,
        name: 'Creative Studio',
        location: 'Geneva, Switzerland',
        description: 'A space for creative professionals with high-speed internet and plenty of outlets.',
        rating: 4.6,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 7,
        name: 'Sky Lounge',
        location: 'Zurich, Switzerland',
        description: 'A rooftop lounge with a great view, perfect for brainstorming sessions.',
        rating: 4.4,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 8,
        name: 'Nomad Hub',
        location: 'Lucerne, Switzerland',
        description: 'A collaborative space designed for digital nomads and remote workers.',
        rating: 4.1,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 9,
        name: 'Urban Space',
        location: 'Bern, Switzerland',
        description: 'A modern, open-plan office in the heart of the city.',
        rating: 4.3,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 10,
        name: 'Quiet Retreat',
        location: 'Grindelwald, Switzerland',
        description: 'A quiet, scenic spot in the mountains, perfect for focused work.',
        rating: 4.9,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 11,
        name: 'Artisan Co-Working',
        location: 'Zurich, Switzerland',
        description: 'A rustic co-working space with artistic decor and a calm atmosphere.',
        rating: 4.6,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
      {
        id: 12,
        name: 'Business Center',
        location: 'Basel, Switzerland',
        description: 'A professional space for meetings and collaboration with all necessary amenities.',
        rating: 4.2,
        imageUrl: 'https://via.placeholder.com/300x200', // Placeholder image
      },
    ];

    // Simulate the delay of fetching data
    setTimeout(() => {
      setWorkplaces(demoWorkplaces);
    }, 1000); // Adding 1 second delay to simulate API call

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
