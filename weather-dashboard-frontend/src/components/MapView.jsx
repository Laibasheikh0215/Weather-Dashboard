import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Navigation } from 'lucide-react';

// Fix for default marker icons in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationMarker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>Selected location<br />Click to fetch weather</Popup>
    </Marker>
  );
};

const MapView = ({ onSelectLocation }) => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Handler for geolocation button
  const locateUser = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        if (map) {
          map.flyTo([latitude, longitude], 12);
          onSelectLocation({ lat: latitude, lng: longitude });
        }
      },
      () => alert('Unable to retrieve your location')
    );
  };

  return (
    <div className="relative glass rounded-2xl overflow-hidden shadow-xl border border-white/20">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '400px', width: '100%' }}
        whenCreated={setMap}
        zoomControl={true}
        attributionControl={true}
      >
        {/* Dark tile layer – more attractive */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <LocationMarker onLocationSelect={onSelectLocation} />
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcon}>
            <Popup>Your location</Popup>
          </Marker>
        )}
      </MapContainer>
      {/* Geolocation button */}
      <button
        onClick={locateUser}
        className="absolute bottom-4 right-4 z-[1000] bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition shadow-lg"
        title="Use my current location"
      >
        <Navigation size={20} className="text-white" />
      </button>
    </div>
  );
};

export default MapView;