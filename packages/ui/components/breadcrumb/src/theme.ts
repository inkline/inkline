export * from './components/breadcrumb/theme';
export * from './components/breadcrumb-item/theme';

import { ComponentSize, ComponentStateColor, defaultComponentSizes, defaultComponentStateColors } from '@inkline/theme';

export const defaultBreadcrumbColor = 'info';
export const defaultBreadcrumbColors = defaultComponentStateColors;
export const defaultBreadcrumbSize = 'md';
export const defaultBreadcrumbSizes = defaultComponentSizes;

export type BreadcrumbColorVariant = ComponentStateColor;
export type BreadcrumbSizeVariant = ComponentSize;
