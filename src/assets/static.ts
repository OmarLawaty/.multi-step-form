import { Addon, Plan } from './types';

import { arcadeIcon, controllerIcon, gamePadIcon } from './images';

export const plans: Plan[] = [
  {
    key: 'arcade',
    title: 'arcade',
    icon: arcadeIcon,
    cost: { monthly: 9, yearly: 90 },
    freeMonths: 2
  },
  {
    key: 'advanced',
    title: 'advanced',
    icon: gamePadIcon,
    cost: { monthly: 12, yearly: 120 },
    freeMonths: 2
  },
  {
    key: 'pro',
    title: 'pro',
    icon: controllerIcon,
    cost: { monthly: 15, yearly: 150 },
    freeMonths: 2
  }
];

export const addons: Addon[] = [
  {
    key: 'service',
    title: 'online service',
    description: 'Access to multiplayer games',
    cost: {
      monthly: 1,
      yearly: 10
    },
    isPromoted: true
  },
  {
    key: 'storage',
    title: 'larger storage',
    description: 'Extra 1TB of cloud save',
    cost: {
      monthly: 2,
      yearly: 20
    },
    isPromoted: false
  },
  {
    key: 'profile',
    title: 'customizable profile',
    description: 'Custom theme on your profile',
    cost: {
      monthly: 2,
      yearly: 20
    },
    isPromoted: false
  }
];
