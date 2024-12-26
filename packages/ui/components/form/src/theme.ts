import { selector } from '@inkline/core';
import { ComponentSize, ComponentStateColor, defaultComponentSizes, defaultComponentStateColors } from '@inkline/theme';

export const defaultFormColor = 'info';
export const defaultFormColors = defaultComponentStateColors;
export const defaultFormSize = 'md';
export const defaultFormSizes = defaultComponentSizes;

export type FormColorVariant = ComponentStateColor;
export type FormSizeVariant = ComponentSize;

export function useFormThemeLayout() {
    selector('.form', {
        position: 'relative'
    });
}

export function useFormTheme() {
    useFormThemeLayout();
}
