export * from './components/radio/theme';
export * from './components/radio-group/theme';

import { ComponentSize, ComponentStateColor, defaultComponentSizes, defaultComponentStateColors } from '@inkline/theme';

export const defaultRadioColor = 'info';
export const defaultRadioColors = defaultComponentStateColors;
export const defaultRadioSize = 'md';
export const defaultRadioSizes = defaultComponentSizes;

export type RadioColorVariant = ComponentStateColor;
export type RadioSizeVariant = ComponentSize;
