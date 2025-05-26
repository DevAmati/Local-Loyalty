import { Customer, Visit, CustomerStats } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Calculate customer stats based on visits
export function calculateCustomerStats(customerId: string, visits: Visit[]): CustomerStats {
  // Filter visits for this customer
  const customerVisits = visits.filter(visit => visit.customerId === customerId);
  const totalVisits = customerVisits.length;
  
  // Count redeemed rewards
  const redeemedRewards = customerVisits.filter(visit => visit.rewardRedeemed).length;
  
  // Calculate total points (1 point per visit)
  const totalPointsEarned = totalVisits;
  
  // Calculate available rewards (every 10 points = 1 reward)
  const totalPointsAfterRedemption = totalPointsEarned - (redeemedRewards * 10);
  const availableRewards = Math.floor(totalPointsAfterRedemption / 10);
  
  // Calculate visits until next reward
  const pointsTowardNextReward = totalPointsAfterRedemption % 10;
  const visitsUntilNextReward = 10 - pointsTowardNextReward;
  
  return {
    totalVisits,
    totalPoints: totalPointsAfterRedemption,
    availableRewards,
    visitsUntilNextReward
  };
}

// Format phone number for display
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
  }
  
  // Return original if not standard format
  return phoneNumber;
}

// Create a new customer
export function createNewCustomer(name: string, phone: string, businessId: string): Customer {
  return {
    id: uuidv4(),
    name,
    phone: phone.replace(/\D/g, ''),
    businessId,
    registeredAt: new Date().toISOString()
  };
}

// Find customer by phone number
export function findCustomerByPhone(phone: string, customers: Customer[], businessId?: string): Customer | null {
  const cleanedPhone = phone.replace(/\D/g, '');
  return customers.find(c => 
    c.phone.replace(/\D/g, '') === cleanedPhone && 
    (!businessId || c.businessId === businessId)
  ) || null;
}

// Create a new visit
export function createNewVisit(customerId: string, businessId: string, redeemReward = false): Visit {
  return {
    id: uuidv4(),
    customerId,
    businessId,
    timestamp: new Date().toISOString(),
    points: 1,
    rewardRedeemed: redeemReward
  };
}

// Get recent visits for a business
export function getRecentVisits(visits: Visit[], businessId: string, limit = 10): Visit[] {
  return visits
    .filter(visit => visit.businessId === businessId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

// Get time ago string
export function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const visitTime = new Date(timestamp);
  const diffMs = now.getTime() - visitTime.getTime();
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffMins > 0) {
    return diffMins === 1 ? '1 minute ago' : `${diffMins} minutes ago`;
  } else {
    return 'Just now';
  }
}