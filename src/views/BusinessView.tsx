import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Check, X } from 'lucide-react';
import { Business, Customer, Visit } from '../types';
import PhoneLookupForm from '../components/PhoneLookupForm';
import CustomerCard from '../components/CustomerCard';
import CustomerForm from '../components/CustomerForm';
import VisitsList from '../components/VisitsList';
import { 
  findCustomerByPhone, 
  calculateCustomerStats, 
  createNewVisit 
} from '../utils/customerUtils';

interface BusinessViewProps {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  visits: Visit[];
  setVisits: (visits: Visit[]) => void;
  selectedBusiness: Business | null;
}

const BusinessView: React.FC<BusinessViewProps> = ({ 
  customers, 
  setCustomers, 
  visits, 
  setVisits,
  selectedBusiness
}) => {
  const [foundCustomer, setFoundCustomer] = useState<Customer | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [animatePoints, setAnimatePoints] = useState(false);
  
  // Handle customer lookup
  const handleCustomerLookup = (phone: string) => {
    if (!selectedBusiness) return;
    
    const customer = findCustomerByPhone(phone, customers, selectedBusiness.id);
    
    if (customer) {
      setFoundCustomer(customer);
      setShowRegistration(false);
    } else {
      setFoundCustomer(null);
      toast.info("Customer not found. Register them now?");
      setShowRegistration(true);
    }
  };
  
  // Handle customer registration
  const handleCustomerRegistration = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
    setFoundCustomer(newCustomer);
    setShowRegistration(false);
    toast.success("Customer registered successfully!");
  };
  
  // Get customer stats and last visit
  const getCustomerInfo = (customer: Customer) => {
    const stats = calculateCustomerStats(customer.id, visits);
    
    const customerVisits = visits
      .filter(visit => visit.customerId === customer.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    const lastVisit = customerVisits.length > 0 ? customerVisits[0] : undefined;
    
    return { stats, lastVisit };
  };
  
  // Handle adding a visit
  const handleAddVisit = (redeemReward = false) => {
    if (!foundCustomer || !selectedBusiness) return;
    
    // Calculate customer stats before adding the visit
    const { stats } = getCustomerInfo(foundCustomer);
    
    // Check if customer can redeem a reward
    if (redeemReward && stats.availableRewards <= 0) {
      toast.error("Customer doesn't have any rewards to redeem.");
      return;
    }
    
    // Create and add the visit
    const newVisit = createNewVisit(foundCustomer.id, selectedBusiness.id, redeemReward);
    setVisits([...visits, newVisit]);
    
    // Animate points
    setAnimatePoints(true);
    setTimeout(() => setAnimatePoints(false), 1000);
    
    // Show success message
    if (redeemReward) {
      toast.success("Reward redeemed successfully!");
    } else {
      toast.success("Visit recorded successfully!");
    }
  };
  
  // Get recent visits for this business
  const getRecentBusinessVisits = () => {
    if (!selectedBusiness) return [];
    
    return visits
      .filter(visit => visit.businessId === selectedBusiness.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  };
  
  // If no business is selected, show a message
  if (!selectedBusiness) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Please select a business to continue</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Business Owner View</h1>
        <p className="text-gray-600">
          Record customer visits and manage rewards
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {/* Phone lookup form */}
          <PhoneLookupForm 
            onLookup={handleCustomerLookup}
            buttonText="Find Customer"
            label="Enter Customer's Phone Number"
          />
          
          {/* Show registration form if customer not found */}
          {showRegistration && !foundCustomer && (
            <div className="mt-6">
              <CustomerForm 
                onSave={handleCustomerRegistration}
                existingCustomers={customers}
                businessId={selectedBusiness.id}
              />
            </div>
          )}
          
          {/* Recent visits */}
          <div className="mt-6">
            <VisitsList
              visits={getRecentBusinessVisits()}
              customers={customers}
              title="Recent Activity"
              emptyMessage="No recent activity"
            />
          </div>
        </div>
        
        <div>
          {/* Show customer card with action buttons if found */}
          {foundCustomer ? (
            <div>
              <CustomerCard 
                customer={foundCustomer}
                {...getCustomerInfo(foundCustomer)}
                animatePoints={animatePoints}
              />
              
              {/* Action buttons */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAddVisit(false)}
                  className="flex items-center justify-center py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Record Visit
                </button>
                
                <button
                  onClick={() => handleAddVisit(true)}
                  className="flex items-center justify-center py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  disabled={getCustomerInfo(foundCustomer).stats.availableRewards <= 0}
                >
                  <Check className="h-5 w-5 mr-2" />
                  Redeem Reward
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center h-72">
              <X className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-center text-gray-500">
                No customer selected. Use the form to look up a customer or register a new one.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessView;