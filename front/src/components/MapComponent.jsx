import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const googleMapsAPIKey = '';


const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Function to get coordinates from an address using Google Maps Geocoding API
  const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${googleMapsAPIKey}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.error('Geocoding failed for address:', address);
        return null;
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
      return null;
    }
  };

  // Fetch the real location data from the API
  useEffect(() => {
    // Replace this URL with your actual API endpoint that returns workplace data
    fetch('http://localhost:8080/api/workSpace') // Example endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched locations:', data);

        // Ensure that data.workSpaces is an array
        if (Array.isArray(data.workSpaces)) {
          const locationsWithCoordinates = data.workSpaces.map(async (loc) => {
            // Get coordinates for each location based on its address
            const coordinates = await getCoordinatesFromAddress(loc.address);
            return { ...loc, coordinates };
          });

          Promise.all(locationsWithCoordinates).then((locations) => {
            setLocations(locations);
            setLoading(false);
          });
        } else {
          console.error('Fetched data.workSpaces is not an array:', data.workSpaces);
        }
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  // If locations are still loading, display a loading message
  if (loading) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <h1>Workspace Map</h1>
      <LoadScript googleMapsApiKey={googleMapsAPIKey}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '500px' }}
          center={{ lat: 32.0658, lng: 34.7703 }} // Default center location
          zoom={12}
        >
          {locations.map((loc) => {
            // Ensure coordinates are available before creating a marker
            if (loc.coordinates) {
              return (
                <Marker
                  key={loc.id}
                  position={loc.coordinates}
                  onClick={() => setSelectedLocation(loc)}
                />
              );
            }
            return null; // Skip if no coordinates found
          })}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.coordinates}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h2>{selectedLocation.name}</h2>
                <p>{selectedLocation.address}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;