import { ComponentSize, ComponentStateColor, defaultComponentSizes, defaultComponentStateColors } from '@inkline/theme';

export const defaultTextareaColor = 'info';
export const defaultTextareaColors = defaultComponentStateColors;
export const defaultTextareaSize = 'md';
export const defaultTextareaSizes = defaultComponentSizes;

export type TextareaColorVariant = ComponentStateColor;
export type TextareaSizeVariant = ComponentSize;

export function useTextareaTheme() {}
