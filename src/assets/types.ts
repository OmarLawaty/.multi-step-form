export type PlanKey = 'arcade' | 'advanced' | 'pro';
export type AddonKey = 'service' | 'storage' | 'profile';

interface Cost {
  monthly: number;
  yearly: number;
}

export interface Plan {
  key: PlanKey;
  title: string;
  icon: string;
  cost: Cost;
  freeMonths?: number;
}

export interface Addon {
  key: AddonKey;
  title: string;
  description: string;
  cost: Cost;
  isPromoted?: boolean;
}

export interface UserData {
  name: string;
  email: string;
  phoneNumber: string;
}
