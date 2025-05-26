import React from 'react';
import { Customer, Visit } from '../types';
import { getTimeAgo } from '../utils/customerUtils';

interface VisitsListProps {
  visits: Visit[];
  customers: Customer[];
  title?: string;
  emptyMessage?: string;
}

const VisitsList: React.FC<VisitsListProps> = ({ 
  visits, 
  customers,
  title = "Recent Visits",
  emptyMessage = "No visits recorded yet"
}) => {
  const getCustomerName = (customerId: string): string => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      {visits.length === 0 ? (
        <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {visits.map(visit => (
            <li key={visit.id} className="py-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{getCustomerName(visit.customerId)}</p>
                  <p className="text-sm text-gray-500">{getTimeAgo(visit.timestamp)}</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    +1 point
                  </span>
                  {visit.rewardRedeemed && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Reward redeemed
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VisitsList;