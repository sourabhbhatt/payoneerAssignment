import {LinkingOptions} from '@react-navigation/native';
import {RootStackParamList} from './types';

export const prefixes = ['payoneer.assignment://'];

const config = {
  screens: {
    Tasks: 'Tasks',
    Onboarding: 'Onboarding',
  },
};

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes,
  config,
};
