import React from 'react';
import { WaterScarcityLocation } from '../types';
import { Droplet, Users, Calendar, BarChart3, X } from 'lucide-react';

interface LocationDetailsProps {
  location: WaterScarcityLocation;
  onClose: () => void;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ location, onClose }) => {
  const getScarcityLevelColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWaterQualityColor = (index: number | undefined) => {
    if (index === undefined) return 'bg-gray-100 text-gray-800';
    
    if (index >= 80) return 'bg-green-100 text-green-800';
    if (index >= 60) return 'bg-blue-100 text-blue-800';
    if (index >= 40) return 'bg-yellow-100 text-yellow-800';
    if (index >= 20) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800">{location.name}</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">{location.district}, {location.state}</p>
        <div className="flex items-center mt-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScarcityLevelColor(location.scarcityLevel)}`}>
            {location.scarcityLevel} Scarcity
          </span>
          {location.waterQualityIndex !== undefined && (
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getWaterQualityColor(location.waterQualityIndex)}`}>
              WQI: {location.waterQualityIndex}
            </span>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700">{location.description}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Users size={18} className="text-gray-500 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Affected Population</p>
            <p className="font-semibold">{location.affectedPopulation.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Calendar size={18} className="text-gray-500 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Last Updated</p>
            <p className="font-semibold">{location.lastUpdated}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Water Scarcity Metrics</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Scarcity Level</span>
              <span className="text-sm font-medium text-gray-700">{location.scarcityLevel}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  location.scarcityLevel === 'Low' ? 'bg-blue-500 w-1/4' :
                  location.scarcityLevel === 'Medium' ? 'bg-yellow-500 w-2/4' :
                  location.scarcityLevel === 'High' ? 'bg-orange-500 w-3/4' :
                  'bg-red-500 w-full'
                }`}
              ></div>
            </div>
          </div>
          
          {location.waterQualityIndex !== undefined && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Water Quality Index</span>
                <span className="text-sm font-medium text-gray-700">{location.waterQualityIndex}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    location.waterQualityIndex >= 80 ? 'bg-green-500' :
                    location.waterQualityIndex >= 60 ? 'bg-blue-500' :
                    location.waterQualityIndex >= 40 ? 'bg-yellow-500' :
                    location.waterQualityIndex >= 20 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${location.waterQualityIndex}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </p>
      </div>
    </div>
  );
};

export default LocationDetails;