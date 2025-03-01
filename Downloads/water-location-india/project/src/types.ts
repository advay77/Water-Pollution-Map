export interface WaterScarcityLocation {
  id: string;
  state: string;
  district: string;
  name: string;
  latitude: number;
  longitude: number;
  scarcityLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  affectedPopulation: number;
  waterQualityIndex?: number;
  lastUpdated: string;
}

export interface PollutionReport {
  name: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  location: string;
  pollutionType: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
}

export const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];