import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet for custom marker styles

// Mock data for locations in Israel
const locations = [
  {
    id: 1,
    name: 'Cafe Lotus',
    address: 'Rothschild Blvd, 5, Tel Aviv',
    latitude: 32.0658,
    longitude: 34.7703,
  },
  {
    id: 2,
    name: 'Store Romashka',
    address: 'Dizengoff St, 10, Tel Aviv',
    latitude: 32.0730,
    longitude: 34.7707,
  },
  {
    id: 3,
    name: 'Library No. 7',
    address: 'Ben Yehuda St, 12, Jerusalem',
    latitude: 31.7688,
    longitude: 35.2137,
  },
];

const MapComponent = () => {
  // Custom icon for red markers (using default Leaflet red marker icon)
  const redIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png', // Default marker icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <div>
      <h1>Map with Red Points</h1>
      <MapContainer center={[32.0658, 34.7703]} zoom={12} style={{ width: '100%', height: '500px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]} icon={redIcon}>
            <Popup>
              {loc.name} <br /> {loc.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;