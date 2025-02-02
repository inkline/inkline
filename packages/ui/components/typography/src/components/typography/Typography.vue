<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

const componentName = 'Typography';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the badge
         * @param {'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the badge
         * @param {'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'lg' | '2xl'} size
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The HTML tag to be rendered by the component
         * @param {string} tag
         * @default 'span'
         */
        tag: {
            type: String,
            default: 'span'
        },
        /**
         * The text alignment
         * @param {'left' | 'center' | 'right' | 'justify'} align
         * @default undefined
         */
        align: {
            type: String as PropType<'left' | 'center' | 'right' | 'justify'>,
            default: undefined
        },
        /**
         * The font weight of the text
         * @param {'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black' | 'lighter' | 'bolder'} fontWeight
         * @default undefined
         */
        fontWeight: {
            type: String,
            default: undefined
        },
        /**
         * The text decoration style
         * @param {'underline' | 'line-through' | 'overline' | 'none'} textDecoration
         * @default undefined
         */
        textDecoration: {
            type: String,
            default: undefined
        },
        /**
         * The line height of the text
         * @param {'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'} lineHeight
         * @default undefined
         */
        lineHeight: {
            type: String,
            default: undefined
        },
        /**
         * The letter spacing of the text
         * @param {'tighter' | 'tight' | 'normal' | 'wide' | 'wider'} letterSpacing
         * @default
         */
        letterSpacing: {
            type: String,
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
        },
        /**
         * Applies a bottom margin to the text for spacing purposes
         * @param {boolean} gutterBottom
         * @default false
         */
        gutterBottom: {
            type: Boolean,
            default: false
        },
        /**
         * Applies a larger font size and lighter font-weight to the text
         * @param {boolean} lead
         * @default false
         */
        lead: {
            type: Boolean,
            default: false
        },
        /**
         * Applies a smaller font size and uppercase text-transform to the text
         * @param {boolean} initialism
         * @default false
         */
        initialism: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const classes = computed(() => ({
            [`-color-${props.color}`]: Boolean(props.color),
            [`-font-size-${props.size}`]: Boolean(props.size),
            [`-align-${props.align}`]: Boolean(props.align),
            [`-font-weight-${props.fontWeight}`]: Boolean(props.fontWeight),
            [`-text-decoration-${props.textDecoration}`]: Boolean(props.textDecoration),
            [`-line-height-${props.lineHeight}`]: Boolean(props.lineHeight),
            [`-letter-spacing-${props.letterSpacing}`]: Boolean(props.letterSpacing),
            [`-text-transform-${props.textTransform}`]: Boolean(props.textTransform),
            [`-line-clamp-${props.lineClamp}`]: props.lineClamp !== undefined,
            '-truncate': props.truncate,
            '-no-wrap': props.noWrap,
            '-gutter-bottom': props.gutterBottom,
            '-lead': props.lead,
            '-initialism': props.initialism
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <Component :is="tag" class="typography" :class="classes">
        <!-- @slot default Slot for default typography content -->
        <slot />
    </Component>
</template>
