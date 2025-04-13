import type { PropType } from 'vue';
import { ColorModePropValue } from '@inkline/types';

export const baseProps = {
    /**
     * The background of the box
     * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string} background
     * @default
     */
    background: {
        type: [String, Object] as PropType<string | ColorModePropValue>,
        default: undefined
    },
    /**
     * The border of the box
     * @param {'none' | 'thin'} border
     * @default
     */
    border: {
        type: String,
        default: undefined
    },
    /**
     * The border-style of the box
     * @param {'none' | 'solid' | 'dashed' | 'dotted'} borderStyle
     * @default
     */
    borderStyle: {
        type: String,
        default: undefined
    },
    /**
     * The border-top-style of the box
     * @param {'none' | 'solid' | 'dashed' | 'dotted'} borderTopStyle
     * @default
     */
    borderTopStyle: {
        type: String,
        default: undefined
    },
    /**
     * The border-right-style of the box
     * @param {'none' | 'solid' | 'dashed' | 'dotted'} borderRightStyle
     * @default
     */
    borderRightStyle: {
        type: String,
        default: undefined
    },
    /**
     * The border-bottom-style of the box
     * @param {'none' | 'solid' | 'dashed' | 'dotted'} borderBottomStyle
     * @default
     */
    borderBottomStyle: {
        type: String,
        default: undefined
    },
    /**
     * The border-left-style of the box
     * @param {'none' | 'solid' | 'dashed' | 'dotted'} borderLeftStyle
     * @default
     */
    borderLeftStyle: {
        type: String,
        default: undefined
    },
    /**
     * The border-width of the box
     * @param {'none' | 'thin' | 'medium' | 'thick'} borderWidth
     * @default
     */
    borderWidth: {
        type: String,
        default: undefined
    },
    /**
     * The border-top-width of the box
     * @param {'none' | 'thin' | 'medium' | 'thick'} borderTopWidth
     * @default
     */
    borderTopWidth: {
        type: String,
        default: undefined
    },
    /**
     * The border-right-width of the box
     * @param {'none' | 'thin' | 'medium' | 'thick'} borderRightWidth
     * @default
     */
    borderRightWidth: {
        type: String,
        default: undefined
    },
    /**
     * The border-bottom-width of the box
     * @param {'none' | 'thin' | 'medium' | 'thick'} borderBottomWidth
     * @default
     */
    borderBottomWidth: {
        type: String,
        default: undefined
    },
    /**
     * The border-left-width of the box
     * @param {'none' | 'thin' | 'medium' | 'thick'} borderLeftWidth
     * @default
     */
    borderLeftWidth: {
        type: String,
        default: undefined
    },
    /**
     * The border-color of the box
     * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string} borderColor
     * @default
     */
    borderColor: {
        type: [String, Object] as PropType<string | ColorModePropValue>,
        default: undefined
    },
    /**
     * The border-top-color of the box
     * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string} borderTopColor
     * @default
     */
    borderTopColor: {
        type: [String, Object] as PropType<string | ColorModePropValue>,
        default: undefined
    },
    /**
     * The border-right-color of the box
     * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string} borderRightColor
     * @default
     */
    borderRightColor: {
        type: [String, Object] as PropType<string | ColorModePropValue>,
        default: undefined
    },
    /**
     * The border-bottom-color of the box
     * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string} borderBottomColor
     * @default
     */
    borderBottomColor: {
        type: [String, Object] as PropType<string | ColorModePropValue>,
        default: undefined
    },
    /**
     * The border-left-color of the box
     * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string} borderLeftColor
     * @default
     */
    borderLeftColor: {
        type: [String, Object] as PropType<string | ColorModePropValue>,
        default: undefined
    },
    /**
     * The border-radius of the box
     * @param {'none' | 'sm' | 'md' | 'lg'} borderRadius
     * @default
     */
    borderRadius: {
        type: String,
        default: undefined
    },
    /**
     * The border-top-left-radius of the box
     * @param {'none' | 'sm' | 'md' | 'lg'} borderTopLeftRadius
     * @default
     */
    borderTopLeftRadius: {
        type: String,
        default: undefined
    },
    /**
     * The border-top-right-radius of the box
     * @param {'none' | 'sm' | 'md' | 'lg'} borderTopRightRadius
     * @default
     */
    borderTopRightRadius: {
        type: String,
        default: undefined
    },
    /**
     * The border-bottom-left-radius of the box
     * @param {'none' | 'sm' | 'md' | 'lg'} borderBottomLeftRadius
     * @default
     */
    borderBottomLeftRadius: {
        type: String,
        default: undefined
    },
    /**
     * The border-bottom-right-radius of the box
     * @param {'none' | 'sm' | 'md' | 'lg'} borderBottomRightRadius
     * @default
     */
    borderBottomRightRadius: {
        type: String,
        default: undefined
    },
    /**
     /**
     * The box-shadow of the box
     * @param {'none' | sm' | 'md' | 'lg'} boxShadow
     * @default
     */
    boxShadow: {
        type: String,
        default: undefined
    },
    /**
     * The margin of the box
     * @param {'sm' | 'md' | 'lg'} margin
     * @default
     */
    margin: {
        type: String,
        default: undefined
    },
    /**
     * The margin- of the box
     * @param {'sm' | 'md' | 'lg'} margin-
     * @default
     */
    marginX: {
        type: String,
        default: undefined
    },
    /**
     * The margin-y of the box
     * @param {'sm' | 'md' | 'lg'} margin-y
     * @default
     */
    marginY: {
        type: String,
        default: undefined
    },
    /**
     * The margin-top of the box
     * @param {'sm' | 'md' | 'lg'} margin-top
     * @default
     */
    marginTop: {
        type: String,
        default: undefined
    },
    /**
     * The margin-right of the box
     * @param {'sm' | 'md' | 'lg'} margin-right
     * @default
     */
    marginRight: {
        type: String,
        default: undefined
    },
    /**
     * The margin-bottom of the box
     * @param {'sm' | 'md' | 'lg'} margin-bottom
     * @default
     */
    marginBottom: {
        type: String,
        default: undefined
    },
    /**
     * The margin-left of the box
     * @param {'sm' | 'md' | 'lg'} margin-left
     * @default
     */
    marginLeft: {
        type: String,
        default: undefined
    },
    /**
     * The opacity of the box
     * @param {number | string} opacity
     */
    opacity: {
        type: [Number, String],
        default: undefined
    },
    /**
     * The padding of the box
     * @param {'sm' | 'md' | 'lg'} padding
     * @default
     */
    padding: {
        type: String,
        default: undefined
    },
    /**
     * The padding-x of the box
     * @param {'sm' | 'md' | 'lg'} padding-x
     * @default
     */
    paddingX: {
        type: String,
        default: undefined
    },
    /**
     * The padding-y of the box
     * @param {'sm' | 'md' | 'lg'} padding-y
     * @default
     */
    paddingY: {
        type: String,
        default: undefined
    },
    /**
     * The padding-top of the box
     * @param {'sm' | 'md' | 'lg'} padding-top
     * @default
     */
    paddingTop: {
        type: String,
        default: undefined
    },
    /**
     * The padding-right of the box
     * @param {'sm' | 'md' | 'lg'} padding-right
     * @default
     */
    paddingRight: {
        type: String,
        default: undefined
    },
    /**
     * The padding-bottom of the box
     * @param {'sm' | 'md' | 'lg'} padding-bottom
     * @default
     */
    paddingBottom: {
        type: String,
        default: undefined
    },
    /**
     * The padding-left of the box
     * @param {'sm' | 'md' | 'lg'} padding-left
     * @default
     */
    paddingLeft: {
        type: String,
        default: undefined
    },
    /**
     * The width of the box
     * @param {'100' | '0' | 'auto' | 'screen' | string} width
     * @default
     */
    width: {
        type: String as PropType<'100' | '0' | 'auto' | 'screen' | string>,
        default: undefined
    },
    /**
     * The height of the box
     * @param {'100' | '0' | 'auto' | 'screen' | string} height
     * @default
     */
    height: {
        type: String as PropType<'100' | '0' | 'auto' | 'screen' | string>,
        default: undefined
    },
    /**
     * Set equal width and height to the box
     * @param {'sm' | 'md' | 'lg' | string} square
     * @default
     */
    square: {
        type: String as PropType<'sm' | 'md' | 'lg' | string>,
        default: undefined
    }
} as const;
