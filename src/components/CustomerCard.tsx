import React from 'react';
import { User, Phone, Award, Calendar, Clock } from 'lucide-react';
import { Customer, Visit, CustomerStats } from '../types';
import { formatPhoneNumber, getTimeAgo } from '../utils/customerUtils';

interface CustomerCardProps {
  customer: Customer;
  stats: CustomerStats;
  lastVisit?: Visit;
  animatePoints?: boolean;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ 
  customer, 
  stats, 
  lastVisit,
  animatePoints = false
}) => {
  const progressPercentage = ((10 - stats.visitsUntilNextReward) / 10) * 100;
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${animatePoints ? 'animate-pulse' : ''}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{customer.name}</h3>
            <div className="flex items-center text-gray-500 mt-1">
              <Phone className="h-4 w-4 mr-2" />
              <span>{formatPhoneNumber(customer.phone)}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-purple-600">{stats.totalPoints}</div>
            <div className="text-sm text-gray-500">points</div>
          </div>
        </div>
        
        {/* Progress toward next reward */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium text-gray-700">
              Progress to next reward
            </div>
            <div className="text-sm text-gray-500">
              {10 - stats.visitsUntilNextReward}/10 visits
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 mr-3">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Visits</div>
              <div className="font-semibold">{stats.totalVisits}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-amber-100 mr-3">
              <Award className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Available Rewards</div>
              <div className="font-semibold">{stats.availableRewards}</div>
            </div>
          </div>
        </div>
        
        {/* Last visit */}
        {lastVisit && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>Last visit: {getTimeAgo(lastVisit.timestamp)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;