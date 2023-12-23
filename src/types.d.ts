type Step = 'your_info' | 'select_plan' | 'add-ons' | 'summary';

type UserInfo = {
  name: string;
  email: string;
  phoneNumber: string;
  isValid: boolean;
};

type PlanInfo = {
  plan: 0 | 1 | 2;
  planType: 'monthly' | 'yearly';
};

type FormInfo = UserInfo & PlanInfo;

interface FormValues extends FormInfo {
  currentStep: Step;
  activeAddons: [boolean, boolean, boolean];
}
