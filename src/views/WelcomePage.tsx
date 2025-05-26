import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Award, Smartphone } from 'lucide-react';
import { Business } from '../types';

interface WelcomePageProps {
  businesses: Business[];
  setSelectedBusiness: (business: Business) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ businesses, setSelectedBusiness }) => {
  const navigate = useNavigate();
  
  const handleSelectBusiness = (business: Business) => {
    setSelectedBusiness(business);
    navigate('/customer');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <Store className="h-16 w-16 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Local Loyalty</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The simplest way for local businesses to reward their loyal customers.
          No apps to download, no cards to carry - just your phone number.
        </p>
      </div>
      
      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Smartphone className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Easy Sign-Up</h3>
          <p className="text-gray-600 text-center">
            Customers register with just their name and phone number. No apps or cards needed.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-teal-100 rounded-full">
              <Store className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Track Visits</h3>
          <p className="text-gray-600 text-center">
            Businesses record customer visits with a single click. Simple and straightforward.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <Award className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Earn Rewards</h3>
          <p className="text-gray-600 text-center">
            After 10 visits, customers receive a free service or item of their choice.
          </p>
        </div>
      </div>
      
      {/* Business selection */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Select a Business</h2>
        <div className="grid gap-4">
          {businesses.map(business => (
            <button
              key={business.id}
              onClick={() => handleSelectBusiness(business)}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderLeftWidth: '4px', borderLeftColor: business.color }}
            >
              <div className="flex-1">
                <h3 className="font-medium">{business.name}</h3>
              </div>
              <div className="text-purple-600">
                Select →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;