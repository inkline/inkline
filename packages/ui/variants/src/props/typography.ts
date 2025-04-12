import type { PropType } from 'vue';

export const typographyProps = {
    /**
     * The color variant of the text
     * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | string} color
     * @default
     */
    color: {
        type: String as PropType<
            | 'primary'
            | 'secondary'
            | 'light'
            | 'dark'
            | 'info'
            | 'success'
            | 'warning'
            | 'danger'
            | string
        >,
        default: undefined
    },
    /**
     * The size variant of the text
     * @param {'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'lg' | '2xl' | string} size
     * @default
     */
    fontSize: {
        type: String as PropType<'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string>,
        default: undefined
    },
    /**
     * The font weight of the text
     * @param {'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black' | 'lighter' | 'bolder' | string} fontWeight
     * @default undefined
     */
    fontWeight: {
        type: String as PropType<
            | 'extralight'
            | 'light'
            | 'normal'
            | 'medium'
            | 'semibold'
            | 'bold'
            | 'black'
            | 'lighter'
            | 'bolder'
            | string
        >,
        default: undefined
    },
    /**
     * The text alignment
     * @param {'left' | 'center' | 'right' | 'justify'} align
     * @default undefined
     */
    textAlign: {
        type: String as PropType<'left' | 'center' | 'right' | 'justify'>,
        default: undefined
    },
    /**
     * The text decoration style
     * @param {'underline' | 'line-through' | 'overline' | 'none' | string} textDecoration
     * @default undefined
     */
    textDecoration: {
        type: String as PropType<'underline' | 'line-through' | 'overline' | 'none' | string>,
        default: undefined
    },
    /**
     * The line height of the text
     * @param {'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' | string} lineHeight
     * @default undefined
     */
    lineHeight: {
        type: String as PropType<'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' | string>,
        default: undefined
    },
    /**
     * The letter spacing of the text
     * @param {'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | string} letterSpacing
     * @default
     */
    letterSpacing: {
        type: String as PropType<'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | string>,
        default: undefined
    },
    /**
     * Whether to truncate the text with an ellipsis if it overflows its container
     * @param {boolean} truncate
     * @default false
     */
    truncate: {
        type: Boolean,
        default: false
    },
    /**
     * The number of lines to display before truncating the text
     * @param {1 | 2 | 3 | 4} lineClamp
     * @default undefined
     */
    lineClamp: {
        type: Number,
        default: undefined
    },
    /**
     * The text transform style
     * @param {'uppercase' | 'lowercase' | 'capitalize' | 'full-width' | 'full-size-kana' | 'math-auto' | 'none'} textTransform
     * @default undefined
     */
    textTransform: {
        type: String,
        default: undefined
    },
    /**
     * Prevents the text from wrapping to a new line
     * @param {boolean} noWrap
     * @default false
     */
    noWrap: {
        type: Boolean,
        default: false
    }
} as const;
