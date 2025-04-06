
export interface UserImpact {
  totalDonated: number;
  volunteerHours: number;
  petitionsSigned: number;
  ngosSupported: number;
  achievements: Achievement[];
  donationHistory: DonationRecord[];
  volunteerHistory: VolunteerRecord[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface DonationRecord {
  id: string;
  ngoId: string;
  ngoName: string;
  amount: number;
  currency: string;
  timestamp: string;
  transactionId?: string;
}

export interface VolunteerRecord {
  id: string;
  ngoId: string;
  ngoName: string;
  hours: number;
  task: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  interests?: string[];
  walletAddress?: string;
  impact: UserImpact;
}
