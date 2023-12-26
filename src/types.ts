import { Addon, AddonKey, Plan, PlanKey, UserData } from './assets/types';

export type Step = 'yourInfo' | 'selectPlan' | 'addons' | 'summary' | 'thankYou';

export type ProductOptions = {
  userData: UserData;
  subscription: 'monthly' | 'yearly';
  plans: {
    selectedPlan: PlanKey;
    getPlan: (planKey?: PlanKey) => Plan;
  };
  addons: {
    selectedAddons: AddonKey[];
    isAddonSelected: (addon: AddonKey) => boolean;
    getAddon: (addonKey: AddonKey) => Addon;
  };
  getTotalCost: () => number;
  getAllDataObject: () => {
    userData: UserData;
    subscription: 'monthly' | 'yearly';
    plan: PlanKey;
    addons: AddonKey[];
  };
};
