import type { App, Component, Ref } from 'vue';
import type { IconDefinition, ToastPosition } from './components';
import type { ValidateOnEvent } from './forms';

export type ComponentProps = {
    color?: string;
    size?: string;
};

export type ColorMode = 'system' | 'light' | 'dark' | string;
export type ColorModeStrategy = 'localStorage' | null;

export type RenderMode = 'client' | 'universal';

export type UserOptions = {
    /**
     * Components
     */
    components?: Record<string, Component>;

    /**
     * Global props override for all components
     */
    props?: ComponentProps;
    propsByComponentName?: Record<string, ComponentProps>;

    /**
     * Color mode
     */
    colorMode?: {
        preference?: ColorMode;
        strategy?: ColorModeStrategy;
        renderMode?: RenderMode;
    };

    /**
     * Icons
     */
    icons?: {
        component?: Component | string;
        definitions: Record<string, IconDefinition>;
    };

    /**
     * Toast
     */
    toast?: {
        color?: string;
        size?: string;
        duration?: number;
        position?: ToastPosition;
    };

    /**
     * Modal
     */
    modal?: {
        color?: string;
        size?: string;
    };

    /**
     * Routing
     */
    router?: {
        component?: Component | string;
    };

    /**
     * Validation
     */

    validation?: {
        validateOn?: ValidateOnEvent[];
    };

    /**
     * Addons
     */

    addons?: InklineAddon[];
};

export type InklineOptions = Required<UserOptions>;

export type InklineAddon = (app: App, options: Ref<InklineOptions>) => void;
