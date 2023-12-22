type Step = 'your_info' | 'select_plan' | 'add-ons' | 'summary';

type FormValues = {
  activeStepIndex: number;
  name: string;
  email: string;
  phoneNumber: string;
  plan: 0 | 1 | 2;
  planType: 'monthly' | 'yearly';
  addon: [boolean, boolean, boolean];
  error: { name: boolean; email: boolean; phoneNumber: boolean };
};

type Plan =
  | { name: 'arcade'; monthly: number; yearly: number }
  | { name: 'advanced'; monthly: number; yearly: number }
  | { name: 'pro'; monthly: number; yearly: number };

type Addon =
  | { name: 'online-services'; price: number; selected: boolean }
  | { name: 'larger-storage'; price: number; selected: boolean }
  | { name: 'customizable-profile'; price: number; selected: boolean };
