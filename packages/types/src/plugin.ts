import type { App, Component, Ref } from 'vue';
import { IconDefinition } from './components';

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
     * Global props options for all components
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
     * Routing
     */
    router?: {
        component?: Component | string;
    };

    /**
     * Addons
     */

    addons?: InklineAddon[];
};

export type InklineOptions = Required<UserOptions>;

export type InklineAddon = (app: App, options: Ref<InklineOptions>) => void;
