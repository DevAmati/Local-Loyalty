import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import CustomerView from './views/CustomerView';
import BusinessView from './views/BusinessView';
import Dashboard from './views/Dashboard';
import WelcomePage from './views/WelcomePage';

// Types
import { Business, Customer, Visit } from './types';

// Sample data
import { sampleBusinesses, sampleCustomers, sampleVisits } from './data/sampleData';

function App() {
  // Local storage for persistent data
  const [businesses, setBusinesses] = useLocalStorage<Business[]>('businesses', sampleBusinesses);
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', sampleCustomers);
  const [visits, setVisits] = useLocalStorage<Visit[]>('visits', sampleVisits);
  const [selectedBusiness, setSelectedBusiness] = useLocalStorage<Business | null>('selectedBusiness', null);

  // Set the document title
  useEffect(() => {
    document.title = 'Local Loyalty Rewards';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        selectedBusiness={selectedBusiness}
        setSelectedBusiness={setSelectedBusiness}
        businesses={businesses}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route 
            path="/" 
            element={
              selectedBusiness ? 
                <Navigate to="/customer\" replace /> : 
                <WelcomePage 
                  businesses={businesses}
                  setSelectedBusiness={setSelectedBusiness}
                />
            } 
          />
          <Route 
            path="/customer" 
            element={
              <CustomerView 
                customers={customers}
                setCustomers={setCustomers}
                visits={visits}
                selectedBusiness={selectedBusiness}
              />
            } 
          />
          <Route 
            path="/business" 
            element={
              <BusinessView 
                customers={customers}
                setCustomers={setCustomers}
                visits={visits}
                setVisits={setVisits}
                selectedBusiness={selectedBusiness}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                customers={customers}
                visits={visits}
                selectedBusiness={selectedBusiness}
              />
            } 
          />
        </Routes>
      </main>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;