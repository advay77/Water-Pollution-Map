import { WaterScarcityLocation } from '../types';

// Generate 50 locations for each state
export const generateWaterScarcityData = (): WaterScarcityLocation[] => {
  const states = [
    { name: 'Andhra Pradesh', center: [15.9129, 79.7400] },
    { name: 'Arunachal Pradesh', center: [28.2180, 94.7278] },
    { name: 'Assam', center: [26.2006, 92.9376] },
    { name: 'Bihar', center: [25.0961, 85.3131] },
    { name: 'Chhattisgarh', center: [21.2787, 81.8661] },
    { name: 'Goa', center: [15.2993, 74.1240] },
    { name: 'Gujarat', center: [22.2587, 71.1924] },
    { name: 'Haryana', center: [29.0588, 76.0856] },
    { name: 'Himachal Pradesh', center: [31.1048, 77.1734] },
    { name: 'Jharkhand', center: [23.6102, 85.2799] },
    { name: 'Karnataka', center: [15.3173, 75.7139] },
    { name: 'Kerala', center: [10.8505, 76.2711] },
    { name: 'Madhya Pradesh', center: [22.9734, 78.6569] },
    { name: 'Maharashtra', center: [19.7515, 75.7139] },
    { name: 'Manipur', center: [24.6637, 93.9063] },
    { name: 'Meghalaya', center: [25.4670, 91.3662] },
    { name: 'Mizoram', center: [23.1645, 92.9376] },
    { name: 'Nagaland', center: [26.1584, 94.5624] },
    { name: 'Odisha', center: [20.9517, 85.0985] },
    { name: 'Punjab', center: [31.1471, 75.3412] },
    { name: 'Rajasthan', center: [27.0238, 74.2179] },
    { name: 'Sikkim', center: [27.5330, 88.5122] },
    { name: 'Tamil Nadu', center: [11.1271, 78.6569] },
    { name: 'Telangana', center: [18.1124, 79.0193] },
    { name: 'Tripura', center: [23.9408, 91.9882] },
    { name: 'Uttar Pradesh', center: [26.8467, 80.9462] },
    { name: 'Uttarakhand', center: [30.0668, 79.0193] },
    { name: 'West Bengal', center: [22.9868, 87.8550] },
    { name: 'Andaman and Nicobar Islands', center: [11.7401, 92.6586] },
    { name: 'Chandigarh', center: [30.7333, 76.7794] },
    { name: 'Dadra and Nagar Haveli and Daman and Diu', center: [20.1809, 73.0169] },
    { name: 'Delhi', center: [28.7041, 77.1025] },
    { name: 'Jammu and Kashmir', center: [33.7782, 76.5762] },
    { name: 'Ladakh', center: [34.1526, 77.5770] },
    { name: 'Lakshadweep', center: [10.5667, 72.6417] },
    { name: 'Puducherry', center: [11.9416, 79.8083] }
  ];

  const scarcityLevels: ('Low' | 'Medium' | 'High' | 'Critical')[] = ['Low', 'Medium', 'High', 'Critical'];
  const districts = [
    'North District', 'South District', 'East District', 'West District', 
    'Central District', 'Urban District', 'Rural District', 'Coastal District', 
    'Highland District', 'Valley District'
  ];

  const waterScarcityData: WaterScarcityLocation[] = [];
  let id = 1;

  states.forEach(state => {
    // Generate 50 locations for each state
    for (let i = 0; i < 50; i++) {
      // Create random offset from state center (within ~50-100km)
      const latOffset = (Math.random() - 0.5) * 2;
      const lngOffset = (Math.random() - 0.5) * 2;
      
      const scarcityLevel = scarcityLevels[Math.floor(Math.random() * scarcityLevels.length)];
      const district = districts[Math.floor(Math.random() * districts.length)];
      
      const location: WaterScarcityLocation = {
        id: `loc-${id}`,
        state: state.name,
        district: district,
        name: `${district} Water Source ${i + 1}`,
        latitude: state.center[0] + latOffset,
        longitude: state.center[1] + lngOffset,
        scarcityLevel: scarcityLevel,
        description: `This area is experiencing ${scarcityLevel.toLowerCase()} water scarcity due to ${
          scarcityLevel === 'Low' ? 'seasonal variations' :
          scarcityLevel === 'Medium' ? 'reduced rainfall and increased demand' :
          scarcityLevel === 'High' ? 'prolonged drought and groundwater depletion' :
          'severe drought, groundwater depletion, and infrastructure issues'
        }.`,
        affectedPopulation: Math.floor(Math.random() * 100000) + 5000,
        waterQualityIndex: Math.floor(Math.random() * 100),
        lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      
      waterScarcityData.push(location);
      id++;
    }
  });

  return waterScarcityData;
};

export const waterScarcityData = generateWaterScarcityData();