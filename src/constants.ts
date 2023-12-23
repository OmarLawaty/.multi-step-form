import { arcadeIcon, controllerIcon, gamePadIcon } from './assets/images';

export const DEFAULT_FORM_VALUES: FormValues = {
  currentStep: 'your_info',
  name: '',
  email: '',
  phoneNumber: '',
  isValid: true,
  selectedPlan: 'arcade',
  subscriptionType: 'monthly',
  activeAddons: [true, false, false]
};

export const STEPS: Step[] = ['your_info', 'select_plan', 'add-ons', 'summary'];

export const PLANS: PlanInfo[] = [
  { title: 'arcade', cost: 9, icon: arcadeIcon, freeMonths: 2 },
  { title: 'advanced', cost: 12, icon: gamePadIcon, freeMonths: 2 },
  { title: 'pro', cost: 15, icon: controllerIcon, freeMonths: 2 }
];

export const ADDONS: AddonInfo[] = [
  {
    title: 'online-service',
    description: 'Access to multiplayer games',
    cost: 1
  },
  {
    title: 'larger-storage',
    description: 'Extra 1TB of cloud save',
    cost: 2
  },
  {
    title: 'customizable-profile',
    description: 'Custom theme on your profile',
    cost: 2
  }
];
