import React, { useMemo } from 'react';
import { Business, Customer, Visit } from '../types';
import { BarChart2, Users, Award } from 'lucide-react';
import VisitsList from '../components/VisitsList';
import { getTimeAgo } from '../utils/customerUtils';

interface DashboardProps {
  customers: Customer[];
  visits: Visit[];
  selectedBusiness: Business | null;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  customers, 
  visits, 
  selectedBusiness 
}) => {
  // Calculate statistics
  const stats = useMemo(() => {
    if (!selectedBusiness) return { totalCustomers: 0, totalVisits: 0, redeemedRewards: 0 };
    
    const businessCustomers = customers.filter(c => c.businessId === selectedBusiness.id);
    const businessVisits = visits.filter(v => v.businessId === selectedBusiness.id);
    const redeemedRewards = businessVisits.filter(v => v.rewardRedeemed).length;
    
    return {
      totalCustomers: businessCustomers.length,
      totalVisits: businessVisits.length,
      redeemedRewards
    };
  }, [customers, visits, selectedBusiness]);
  
  // Get recent visits
  const recentVisits = useMemo(() => {
    if (!selectedBusiness) return [];
    
    return visits
      .filter(visit => visit.businessId === selectedBusiness.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  }, [visits, selectedBusiness]);
  
  // Get top customers
  const topCustomers = useMemo(() => {
    if (!selectedBusiness) return [];
    
    // Count visits per customer
    const visitCounts = new Map<string, number>();
    visits
      .filter(v => v.businessId === selectedBusiness.id)
      .forEach(visit => {
        const count = visitCounts.get(visit.customerId) || 0;
        visitCounts.set(visit.customerId, count + 1);
      });
    
    // Get the business customers with their visit counts
    return customers
      .filter(c => c.businessId === selectedBusiness.id)
      .map(customer => ({
        customer,
        visitCount: visitCounts.get(customer.id) || 0,
        lastVisitDate: visits
          .filter(v => v.customerId === customer.id)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]?.timestamp
      }))
      .sort((a, b) => b.visitCount - a.visitCount)
      .slice(0, 5);
  }, [customers, visits, selectedBusiness]);
  
  // If no business is selected, show a message
  if (!selectedBusiness) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Please select a business to view the dashboard</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Business Dashboard</h1>
        <p className="text-gray-600">
          Overview of your loyalty program performance
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-purple-100 mr-3">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Total Customers</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalCustomers}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-teal-100 mr-3">
              <BarChart2 className="h-5 w-5 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold">Total Visits</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalVisits}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-amber-100 mr-3">
              <Award className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold">Rewards Redeemed</h3>
          </div>
          <p className="text-3xl font-bold">{stats.redeemedRewards}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div>
          <VisitsList
            visits={recentVisits}
            customers={customers}
            title="Recent Activity"
            emptyMessage="No recent activity"
          />
        </div>
        
        {/* Top customers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Top Customers</h3>
          
          {topCustomers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No customer data available</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {topCustomers.map(({ customer, visitCount, lastVisitDate }) => (
                <li key={customer.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      {lastVisitDate && (
                        <p className="text-sm text-gray-500">
                          Last visit: {getTimeAgo(lastVisitDate)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {visitCount} visits
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;