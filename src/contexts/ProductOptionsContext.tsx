import { ReactNode, createContext, useContext, useReducer } from 'react';

import { ProductOptions } from '../types';

import { addons, plans } from '../assets/static';
import { Addon, AddonKey, Plan, PlanKey, UserData } from '../assets/types';

type Action =
  | {
      type: 'reset-options';
    }
  | {
      type: 'update-user-data';
      payload: UserData;
    }
  | {
      type: 'switch-subscription';
    }
  | {
      type: 'update-plan';
      payload: {
        selectedPlan: PlanKey;
      };
    }
  | {
      type: 'update-addon';
      payload: {
        selectedAddon: AddonKey;
      };
    };

const getPromotedAddons = () => addons.filter(addon => addon.isPromoted).map(addon => addon.key);

const defaultProductOptions: ProductOptions = {
  userData: {
    name: '',
    email: '',
    phoneNumber: ''
  },
  subscription: 'monthly',
  plans: {
    selectedPlan: 'arcade',
    getPlan: function (planKey) {
      return plans.find(plan => plan.key === (planKey ? planKey : this.selectedPlan)) as Plan;
    }
  },
  addons: {
    selectedAddons: getPromotedAddons(),
    isAddonSelected: function (addon) {
      return this.selectedAddons.includes(addon);
    },
    getAddon: function (addonKey) {
      return addons.find(addon => addon.key === addonKey) as Addon;
    }
  },
  getTotalCost: function () {
    const getAddonsTotalCost = (type: 'monthly' | 'yearly') => {
      const selectedAddonsList = this.addons.selectedAddons.map(addonKey =>
        addons.find(addon => addon.key === addonKey)
      );
      return selectedAddonsList?.reduce((acc, addon) => acc + (addon?.cost[type] as number), 0);
    };

    switch (this.subscription) {
      case 'monthly':
        return (this.plans.getPlan()?.cost.monthly as number) + getAddonsTotalCost('monthly');

      case 'yearly':
        return (this.plans.getPlan()?.cost.yearly as number) + getAddonsTotalCost('yearly');
    }
  },
  getAllDataObject: function () {
    return {
      userData: this.userData,
      subscription: this.subscription,
      plan: this.plans.selectedPlan,
      addons: this.addons.selectedAddons
    };
  }
};

const ProductOptionsContext = createContext<ProductOptions>(defaultProductOptions);
const ProductOptionsDispatcherContext = createContext<React.Dispatch<Action>>(
  null as unknown as React.Dispatch<Action>
);

export const ProductOptionsProvider = ({ children }: { children: ReactNode }) => {
  const [currentOptions, dispatch] = useReducer(optionsReducer, defaultProductOptions);

  return (
    <ProductOptionsDispatcherContext.Provider value={dispatch}>
      <ProductOptionsContext.Provider value={currentOptions}>{children}</ProductOptionsContext.Provider>
    </ProductOptionsDispatcherContext.Provider>
  );
};

const getUpdatedAddonsArray = (currentAddons: AddonKey[], clickedAddon: AddonKey) => {
  const wasAddonSelected = currentAddons.find(addon => clickedAddon === addon);

  if (wasAddonSelected) return currentAddons.filter(addon => addon !== clickedAddon);

  return [...currentAddons, clickedAddon];
};

const optionsReducer = (currentOptions: ProductOptions, action: Action): ProductOptions => {
  switch (action.type) {
    case 'reset-options':
      return defaultProductOptions;

    case 'update-user-data':
      return { ...currentOptions, userData: action.payload };

    case 'switch-subscription':
      return { ...currentOptions, subscription: currentOptions.subscription === 'monthly' ? 'yearly' : 'monthly' };

    case 'update-plan':
      return { ...currentOptions, plans: { ...currentOptions.plans, selectedPlan: action.payload.selectedPlan } };

    case 'update-addon':
      return {
        ...currentOptions,
        addons: {
          ...currentOptions.addons,
          selectedAddons: getUpdatedAddonsArray(currentOptions.addons.selectedAddons, action.payload.selectedAddon)
        }
      };
  }
};

type ProductOptionsState = () => [ProductOptions, React.Dispatch<Action>];

// eslint-disable-next-line react-refresh/only-export-components
export const useProductOptionsState: ProductOptionsState = () => [
  useContext(ProductOptionsContext),
  useContext(ProductOptionsDispatcherContext)
];
