import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Inbox } from 'lucide-react';
import { Business, Customer, Visit } from '../types';
import CustomerCard from '../components/CustomerCard';
import PhoneLookupForm from '../components/PhoneLookupForm';
import CustomerForm from '../components/CustomerForm';
import { findCustomerByPhone, calculateCustomerStats } from '../utils/customerUtils';

interface CustomerViewProps {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  visits: Visit[];
  selectedBusiness: Business | null;
}

const CustomerView: React.FC<CustomerViewProps> = ({ 
  customers, 
  setCustomers, 
  visits,
  selectedBusiness
}) => {
  const [foundCustomer, setFoundCustomer] = useState<Customer | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Customer View</h1>
        <p className="text-gray-600">
          Look up your points or register as a new customer
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {/* Phone lookup form */}
          <PhoneLookupForm 
            onLookup={handleCustomerLookup} 
            buttonText="Check My Points"
            label="Enter Your Phone Number"
          />
          
          {/* Show registration form if customer not found */}
          {showRegistration && !foundCustomer && (
            <div className="mt-6">
              <CustomerForm 
                onSave={handleCustomerRegistration}
                existingCustomers={customers}
                businessId={selectedBusiness.id}
                buttonText="Register"
              />
            </div>
          )}
        </div>
        
        <div>
          {/* Show customer card if found */}
          {foundCustomer ? (
            <CustomerCard 
              customer={foundCustomer}
              {...getCustomerInfo(foundCustomer)}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center h-full">
              <Inbox className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-center text-gray-500">
                Enter your phone number to check your points and rewards.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerView;