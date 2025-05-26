export interface Business {
  id: string;
  name: string;
  type: 'barbershop' | 'salon' | 'cafe' | 'restaurant' | 'other';
  color: string;
  logo?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  businessId: string;
  registeredAt: string;
}

export interface Visit {
  id: string;
  customerId: string;
  businessId: string;
  timestamp: string;
  points: number;
  rewardRedeemed?: boolean;
}

export interface CustomerStats {
  totalVisits: number;
  totalPoints: number;
  availableRewards: number;
  visitsUntilNextReward: number;
}