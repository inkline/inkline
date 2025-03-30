import type { App, Component, Ref } from 'vue';
import type { IconDefinition, ToastPosition } from './components';
import type { ValidateOnEvent } from './forms';

export type ColorModeComponentProp = {
    light: string;
    dark: string;
};

export type ComponentProps = {
    alignItems?: string;
    alignContent?: string;
    alignSelf?: string;
    background?: string | ColorModeComponentProp;
    border?: string;
    borderWidth?: string;
    borderTopWidth?: string;
    borderRightWidth?: string;
    borderBottomWidth?: string;
    borderLeftWidth?: string;
    borderStyle?: string;
    borderTopStyle?: string;
    borderRightStyle?: string;
    borderBottomStyle?: string;
    borderLeftStyle?: string;
    borderColor?: string | ColorModeComponentProp;
    borderTopColor?: string | ColorModeComponentProp;
    borderRightColor?: string | ColorModeComponentProp;
    borderBottomColor?: string | ColorModeComponentProp;
    borderLeftColor?: string | ColorModeComponentProp;
    borderRadius?: string;
    borderTopLeftRadius?: string;
    borderTopRightRadius?: string;
    borderBottomRightRadius?: string;
    borderBottomLeftRadius?: string;
    boxShadow?: string;
    color?: string | ColorModeComponentProp;
    display?: string;
    fontSize?: string;
    fontWeight?: string;
    margin?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginX?: string;
    marginY?: string;
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;
    overflow?: string;
    overflowX?: string;
    overflowY?: string;
    textAlign?: string;
    textOverflow?: string;
    whiteSpace?: string;
    wordBreak?: string;
    flexDirection?: string;
    flexWrap?: string;
    gap?: string;
    gapX?: string;
    gapY?: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridColumnGap?: string;
    gridRowGap?: string;
    gridColumnStart?: string;
    gridColumnEnd?: string;
    gridRowStart?: string;
    gridRowEnd?: string;
    height?: string;
    justifyContent?: string;
    padding?: string;
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingX?: string;
    paddingY?: string;
    size?: string;
    width?: string;
};

export type ComponentVariant = ComponentProps & {
    extends?: string | string[];
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
     * Theme
     */
    theme?: {
        tailwindcss?: boolean;
        prefix?: string;
        variants?: Record<string, ComponentVariant>;
    };

    /**
     * Addons
     */

    addons?: InklineAddon[];
};

export type InklineOptions = Required<UserOptions>;

export type InklineAddon = (app: App, options: Ref<InklineOptions>) => void;
