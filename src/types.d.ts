type Step = 'your_info' | 'select_plan' | 'add-ons' | 'summary';

type UserInfo = {
  name: string;
  email: string;
  phoneNumber: string;
  isValid: boolean;
};

type PlanInfo = {
  selectedPlan: 0 | 1 | 2;
};

type FormInfo = UserInfo & PlanInfo;

interface FormValues extends FormInfo {
  currentStep: Step;
  subscriptionType: 'monthly' | 'yearly';
  activeAddons: [boolean, boolean, boolean];
}
