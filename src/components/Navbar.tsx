import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, User, BarChart2 } from 'lucide-react';
import { Business } from '../types';

interface NavbarProps {
  selectedBusiness: Business | null;
  setSelectedBusiness: (business: Business | null) => void;
  businesses: Business[];
}

const Navbar: React.FC<NavbarProps> = ({ selectedBusiness, setSelectedBusiness, businesses }) => {
  const location = useLocation();
  
  // If no business is selected, only show logo
  if (!selectedBusiness) {
    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Store className="h-6 w-6 text-purple-600 mr-2" />
            <span className="text-xl font-semibold">Local Loyalty</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <Store className="h-6 w-6 text-purple-600 mr-2" />
          <span className="text-xl font-semibold mr-2">Local Loyalty</span>
          <span className="text-sm text-gray-500">•</span>
          <select 
            className="ml-2 text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1"
            value={selectedBusiness.id}
            onChange={(e) => {
              const selected = businesses.find(b => b.id === e.target.value);
              if (selected) setSelectedBusiness(selected);
            }}
          >
            {businesses.map(business => (
              <option key={business.id} value={business.id}>
                {business.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex space-x-1">
          <Link 
            to="/customer" 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/customer' 
                ? 'bg-purple-100 text-purple-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>Customer</span>
            </div>
          </Link>
          
          <Link 
            to="/business" 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/business' 
                ? 'bg-teal-100 text-teal-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <Store className="h-4 w-4 mr-1" />
              <span>Business</span>
            </div>
          </Link>
          
          <Link 
            to="/dashboard" 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/dashboard' 
                ? 'bg-orange-100 text-orange-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-1" />
              <span>Dashboard</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;