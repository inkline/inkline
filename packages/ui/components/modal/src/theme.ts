export * from './components/modal/theme';
export * from './components/modal-container/theme';

import { ComponentSize, ComponentStateColor, defaultComponentSizes, defaultComponentStateColors } from '@inkline/theme';

export const defaultModalColor = 'info';
export const defaultModalColors = defaultComponentStateColors;
export const defaultModalSize = 'md';
export const defaultModalSizes = defaultComponentSizes;

export type ModalColorVariant = ComponentStateColor;
export type ModalSizeVariant = ComponentSize;
