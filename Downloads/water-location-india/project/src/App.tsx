import React, { useState } from 'react';
import { Droplet, Map, FileText, AlertTriangle } from 'lucide-react';
import WaterScarcityMap from './components/WaterScarcityMap';
import LocationDetails from './components/LocationDetails';
import PollutionReportForm from './components/PollutionReportForm';
import { waterScarcityData } from './data/waterScarcityData';
import { WaterScarcityLocation, PollutionReport } from './types';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<WaterScarcityLocation | null>(null);
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [activeTab, setActiveTab] = useState<'map' | 'report'>('map');
  const [submittedReports, setSubmittedReports] = useState<PollutionReport[]>([]);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

  const handleReportSubmit = (report: PollutionReport) => {
    setSubmittedReports(prev => [...prev, report]);
    setShowSubmissionSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSubmissionSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Droplet size={28} className="mr-2" />
              <h1 className="text-2xl font-bold">India Water Watch</h1>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('map')}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  activeTab === 'map' 
                    ? 'bg-white text-blue-700 font-medium' 
                    : 'bg-blue-800 text-white hover:bg-blue-600'
                }`}
              >
                <Map size={18} className="mr-2" />
                Water Scarcity Map
              </button>
              <button 
                onClick={() => setActiveTab('report')}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  activeTab === 'report' 
                    ? 'bg-white text-blue-700 font-medium' 
                    : 'bg-blue-800 text-white hover:bg-blue-600'
                }`}
              >
                <FileText size={18} className="mr-2" />
                Report Pollution
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Success Message */}
        {showSubmissionSuccess && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <div className="flex">
              <div className="py-1">
                <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold">Report Submitted Successfully!</p>
                <p className="text-sm">Thank you for your contribution. Your report has been received and will be reviewed by our team.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">Water Scarcity Map of India</h2>
              <p className="text-gray-600 mt-1">
                Explore water scarcity levels across different regions of India. Click on markers to view detailed information.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Map Container */}
              <div className="lg:w-2/3 h-[500px]">
                <WaterScarcityMap 
                  locations={waterScarcityData}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  selectedState={selectedState}
                  setSelectedState={setSelectedState}
                />
              </div>
              
              {/* Details Panel */}
              <div className="lg:w-1/3">
                {selectedLocation ? (
                  <LocationDetails 
                    location={selectedLocation} 
                    onClose={() => setSelectedLocation(null)} 
                  />
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 h-full flex flex-col justify-center items-center text-center">
                    <AlertTriangle size={48} className="text-blue-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Location Selected</h3>
                    <p className="text-gray-600">
                      Click on any marker on the map to view detailed information about water scarcity in that location.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About This Map</h3>
              <p className="text-gray-600 mb-3">
                This interactive map displays water scarcity levels across India. The data is categorized into four levels:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-md border border-blue-200">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Low Scarcity</span>
                  </div>
                  <p className="text-sm text-gray-600">Areas with adequate water supply but may face seasonal variations.</p>
                </div>
                <div className="bg-white p-3 rounded-md border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="font-medium">Medium Scarcity</span>
                  </div>
                  <p className="text-sm text-gray-600">Areas experiencing reduced rainfall and increased water demand.</p>
                </div>
                <div className="bg-white p-3 rounded-md border border-orange-200">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                    <span className="font-medium">High Scarcity</span>
                  </div>
                  <p className="text-sm text-gray-600">Areas facing prolonged drought and groundwater depletion.</p>
                </div>
                <div className="bg-white p-3 rounded-md border border-red-200">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span className="font-medium">Critical Scarcity</span>
                  </div>
                  <p className="text-sm text-gray-600">Areas with severe drought, depleted groundwater, and infrastructure issues.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <PollutionReportForm onSubmit={handleReportSubmit} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Droplet size={20} className="mr-2" />
                India Water Watch
              </h3>
              <p className="text-gray-400 text-sm">
                A platform dedicated to monitoring water scarcity and pollution across India. 
                Together we can make a difference in preserving our water resources.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Water Conservation Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Government Initiatives</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <p className="text-gray-400 text-sm mb-4">
                Stay updated with the latest information on water resources and conservation efforts.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© 2025 India Water Watch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;