import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import { WaterScarcityLocation, indianStates } from '../types';
import { Droplet } from 'lucide-react';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface WaterScarcityMapProps {
  locations: WaterScarcityLocation[];
  selectedLocation: WaterScarcityLocation | null;
  setSelectedLocation: (location: WaterScarcityLocation | null) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
}

// Fix for marker icons in React Leaflet
const createCustomIcon = (scarcityLevel: string) => {
  let color;
  switch (scarcityLevel) {
    case 'Low':
      color = 'blue';
      break;
    case 'Medium':
      color = 'yellow';
      break;
    case 'High':
      color = 'orange';
      break;
    case 'Critical':
      color = 'red';
      break;
    default:
      color = 'gray';
  }

  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Component to handle map bounds
const MapBoundsHandler = ({ locations, selectedState }: { locations: WaterScarcityLocation[], selectedState: string }) => {
  const map = useMap();
  
  useEffect(() => {
    if (locations.length > 0) {
      const filteredLocations = selectedState === 'All States' 
        ? locations 
        : locations.filter(loc => loc.state === selectedState);
      
      if (filteredLocations.length > 0) {
        const bounds = new LatLngBounds([]);
        filteredLocations.forEach(loc => {
          bounds.extend([loc.latitude, loc.longitude]);
        });
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [locations, selectedState, map]);
  
  return null;
};

const WaterScarcityMap: React.FC<WaterScarcityMapProps> = ({ 
  locations, 
  selectedLocation, 
  setSelectedLocation,
  selectedState,
  setSelectedState
}) => {
  const [filteredLocations, setFilteredLocations] = useState<WaterScarcityLocation[]>(locations);

  useEffect(() => {
    if (selectedState === 'All States') {
      setFilteredLocations(locations);
    } else {
      setFilteredLocations(locations.filter(loc => loc.state === selectedState));
    }
  }, [selectedState, locations]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by State:
        </label>
        <select
          id="stateFilter"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="All States">All States</option>
          {indianStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-1 relative">
        <MapContainer 
          center={[20.5937, 78.9629]} 
          zoom={5} 
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapBoundsHandler locations={locations} selectedState={selectedState} />
          
          {filteredLocations.map(location => (
            <Marker 
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={createCustomIcon(location.scarcityLevel)}
              eventHandlers={{
                click: () => {
                  setSelectedLocation(location);
                }
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{location.name}</h3>
                  <p className="text-sm">{location.district}, {location.state}</p>
                  <p className="text-sm mt-1">
                    Scarcity Level: 
                    <span className={`font-semibold ml-1 ${
                      location.scarcityLevel === 'Low' ? 'text-blue-600' :
                      location.scarcityLevel === 'Medium' ? 'text-yellow-600' :
                      location.scarcityLevel === 'High' ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {location.scarcityLevel}
                    </span>
                  </p>
                  <button 
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => setSelectedLocation(location)}
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md z-[1000]">
          <h4 className="font-semibold text-sm mb-2">Scarcity Levels</h4>
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span>High</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Critical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterScarcityMap;