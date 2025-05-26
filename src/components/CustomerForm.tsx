import React, { useState } from 'react';
import { Customer } from '../types';
import { createNewCustomer, findCustomerByPhone } from '../utils/customerUtils';

interface CustomerFormProps {
  onSave: (customer: Customer) => void;
  existingCustomers: Customer[];
  businessId: string;
  buttonText?: string;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ 
  onSave, 
  existingCustomers, 
  businessId,
  buttonText = "Register Customer"
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{name?: string; phone?: string}>({});
  
  const validateForm = (): boolean => {
    const newErrors: {name?: string; phone?: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Check if phone number already exists for this business
      const cleanedPhone = phone.replace(/\D/g, '');
      const existingCustomer = findCustomerByPhone(cleanedPhone, existingCustomers, businessId);
      
      if (existingCustomer) {
        newErrors.phone = 'A customer with this phone number already exists';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newCustomer = createNewCustomer(name, phone, businessId);
      onSave(newCustomer);
      
      // Reset form
      setName('');
      setPhone('');
      setErrors({});
    }
  };
  
  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    if (input.length > 0) {
      formatted = input.length > 3 ? `(${input.slice(0, 3)})` : `(${input}`;
      
      if (input.length > 3) {
        formatted += ` ${input.slice(3, 6)}`;
      }
      
      if (input.length > 6) {
        formatted += `-${input.slice(6, 10)}`;
      }
    }
    
    setPhone(formatted);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">New Customer Registration</h3>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-purple-500`}
          placeholder="Enter customer name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-purple-500`}
          placeholder="(555) 123-4567"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>
      
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default CustomerForm;