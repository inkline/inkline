import type { RequiredDeep } from 'type-fest';

export type ComponentProps = {
    color?: string;
    size?: string;
};

export type ColorMode = 'system' | 'light' | 'dark' | string;
export type ColorModeStrategy = 'localStorage' | null;

export type RenderMode = 'client' | 'universal';

export type UserOptions = {
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
};

export type InklineOptions = RequiredDeep<UserOptions>;
