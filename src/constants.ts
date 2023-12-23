export const DEFAULT_FORM_VALUES: FormValues = {
  currentStep: 'your_info',
  name: '',
  email: '',
  phoneNumber: '',
  isValid: true,
  plan: 0,
  planType: 'monthly',
  activeAddons: [true, false, false]
};

export const STEPS: Step[] = ['your_info', 'select_plan', 'add-ons', 'summary'];
