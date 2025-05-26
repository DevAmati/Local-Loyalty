import React, { useState } from 'react';

interface PhoneLookupFormProps {
  onLookup: (phone: string) => void;
  buttonText?: string;
  label?: string;
}

const PhoneLookupForm: React.FC<PhoneLookupFormProps> = ({ 
  onLookup,
  buttonText = "Find Customer",
  label = "Enter Phone Number"
}) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  
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
    setError(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      setError('Please enter a phone number');
      return;
    }
    
    onLookup(phone);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="lookup-phone" className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type="tel"
          id="lookup-phone"
          value={phone}
          onChange={handlePhoneChange}
          className={`w-full px-3 py-2 border rounded-md ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-purple-500`}
          placeholder="(555) 123-4567"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
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

export default PhoneLookupForm;