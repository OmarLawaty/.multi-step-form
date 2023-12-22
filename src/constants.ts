export const DEFAULT_FORM_VALUES: FormValues = {
  activeStepIndex: 0,
  name: '',
  email: '',
  phoneNumber: '',
  plan: 0,
  planType: 'monthly',
  addon: [true, true, false],
  error: {
    name: false,
    email: false,
    phoneNumber: false
  }
};

export const STEPS: Step[] = ['your_info', 'select_plan', 'add-ons', 'summary'];
