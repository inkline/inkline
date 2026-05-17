import type { App, Component, Ref } from 'vue';
import type { IconDefinition, ToastPosition } from './components';
import type { ValidateOnEvent } from './forms';
import type { ComponentProps } from './props';
import type { VariantProps } from './variants';

export type ColorMode = 'system' | 'light' | 'dark' | string;
export type ColorModeStrategy = 'localStorage' | null;

export type RenderMode = 'client' | 'universal';

export type ComponentsOptions = Record<string, Component>;

export type PropsOptions = ComponentProps;
export type PropsByComponentNameOptions = Record<string, ComponentProps>;

export type ColorModeOptions = {
    preference?: ColorMode;
    strategy?: ColorModeStrategy;
    renderMode?: RenderMode;
};

export type IconsOptions = {
    component?: Component | string;
    definitions: Record<string, IconDefinition>;
};

export type ToastOptions = {
    color?: string;
    size?: string;
    duration?: number;
    position?: ToastPosition;
};

export type ModalOptions = {
    color?: string;
    size?: string;
};

export type RouterOptions = {
    component?: Component | string;
};

export type ValidationOptions = {
    validateOn?: ValidateOnEvent[];
};

export type ThemeOptions = {
    tailwindcss?: boolean;
    prefix?: string;
    variants?: Record<string, VariantProps>;
};

export type UserOptions = {
    /**
     * Components
     */
    components?: ComponentsOptions;

    /**
     * Global props override for all components
     */
    props?: PropsOptions;
    propsByComponentName?: PropsByComponentNameOptions;

    /**
     * Color mode
     */
    colorMode?: ColorModeOptions;

    /**
     * Icons
     */
    icons?: IconsOptions;

    /**
     * Toast
     */
    toast?: ToastOptions;

    /**
     * Modal
     */
    modal?: ModalOptions;

    /**
     * Routing
     */
    router?: RouterOptions;

    /**
     * Validation
     */

    validation?: ValidationOptions;

    /**
     * Theme
     */
    theme?: ThemeOptions;

    /**
     * Addons
     */

    addons?: InklineAddon[];
};

export type InklineOptions = Required<UserOptions>;

export type InklineAddon = (app: App, options: Ref<InklineOptions>) => void;
