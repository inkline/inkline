export * from './components/toast/theme';
export * from './components/toast-container/theme';

import { ComponentSize, ComponentStateColor, defaultComponentSizes, defaultComponentStateColors } from '@inkline/theme';

export const defaultToastColor = 'info';
export const defaultToastColors = defaultComponentStateColors;
export const defaultToastSize = 'md';
export const defaultToastSizes = defaultComponentSizes;

export type ToastColorVariant = ComponentStateColor;
export type ToastSizeVariant = ComponentSize;
