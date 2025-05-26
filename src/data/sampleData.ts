import { Business, Customer, Visit } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const sampleBusinesses: Business[] = [
  {
    id: 'b1',
    name: "Tony's Barber Shop",
    type: 'barbershop',
    color: '#7C3AED', // Purple
  },
  {
    id: 'b2',
    name: "Bella's Hair Salon",
    type: 'salon',
    color: '#EC4899', // Pink
  },
  {
    id: 'b3',
    name: "Corner Cafe",
    type: 'cafe',
    color: '#0D9488', // Teal
  }
];

export const sampleCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'John Smith',
    phone: '555-123-4567',
    businessId: 'b1',
    registeredAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  },
  {
    id: 'c2',
    name: 'Sarah Johnson',
    phone: '555-234-5678',
    businessId: 'b1',
    registeredAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
  },
  {
    id: 'c3',
    name: 'Michael Brown',
    phone: '555-345-6789',
    businessId: 'b2',
    registeredAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
  },
  {
    id: 'c4',
    name: 'Jessica Davis',
    phone: '555-456-7890',
    businessId: 'b2',
    registeredAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
  {
    id: 'c5',
    name: 'David Wilson',
    phone: '555-567-8901',
    businessId: 'b3',
    registeredAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
  }
];

// Generate sample visits
export const sampleVisits: Visit[] = [];

// John Smith - 8 visits to Tony's
for (let i = 0; i < 8; i++) {
  sampleVisits.push({
    id: uuidv4(),
    customerId: 'c1',
    businessId: 'b1',
    timestamp: new Date(Date.now() - (30 - i * 3) * 24 * 60 * 60 * 1000).toISOString(),
    points: 1
  });
}

// Sarah Johnson - 12 visits to Tony's (with 1 reward redeemed)
for (let i = 0; i < 12; i++) {
  sampleVisits.push({
    id: uuidv4(),
    customerId: 'c2',
    businessId: 'b1',
    timestamp: new Date(Date.now() - (45 - i * 3) * 24 * 60 * 60 * 1000).toISOString(),
    points: 1,
    rewardRedeemed: i === 9 // Redeemed on 10th visit
  });
}

// Michael Brown - 5 visits to Bella's
for (let i = 0; i < 5; i++) {
  sampleVisits.push({
    id: uuidv4(),
    customerId: 'c3',
    businessId: 'b2',
    timestamp: new Date(Date.now() - (30 - i * 5) * 24 * 60 * 60 * 1000).toISOString(),
    points: 1
  });
}

// Jessica Davis - 2 visits to Bella's
for (let i = 0; i < 2; i++) {
  sampleVisits.push({
    id: uuidv4(),
    customerId: 'c4',
    businessId: 'b2',
    timestamp: new Date(Date.now() - (15 - i * 7) * 24 * 60 * 60 * 1000).toISOString(),
    points: 1
  });
}

// David Wilson - 9 visits to Corner Cafe
for (let i = 0; i < 9; i++) {
  sampleVisits.push({
    id: uuidv4(),
    customerId: 'c5',
    businessId: 'b3',
    timestamp: new Date(Date.now() - (20 - i * 2) * 24 * 60 * 60 * 1000).toISOString(),
    points: 1
  });
}