type Step = 'your_info' | 'select_plan' | 'add-ons' | 'summary';
type Plan = 'arcade' | 'advanced' | 'pro';
type Addon = 'online-service' | 'larger-storage' | 'customizable-profile';

interface PlanInfo {
  title: Plan;
  cost: number;
  icon: string;
  freeMonths?: number;
}

interface AddonInfo {
  title: Addon;
  description: string;
  cost: number;
}

interface FormValues {
  currentStep: Step;
  isValid: boolean;

  name: string;
  email: string;
  phoneNumber: string;

  subscriptionType: 'monthly' | 'yearly';
  selectedPlan: Plan;

  activeAddons: [boolean, boolean, boolean];
}
