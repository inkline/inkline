<script lang="ts">
import { markRaw, PropType } from 'vue';
import { computed, defineComponent, inject } from 'vue';
import { useComponentColor, useComponentSize, useOptions } from '@inkline/composables';
import { ButtonGroupKey, FormKey, FormGroupKey } from '@inkline/types';
import { GridBox } from '@inkline/component-box';
import { Linkable } from '@inkline/component-linkable';
import { Loader } from '@inkline/component-loader';

const componentName = 'Button';

export function useButtonVariants() {
    const { addThemeVariant } = useOptions();
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    const colors = [
        'primary',
        'secondary',
        'success',
        'light',
        'dark',
        'info',
        'success',
        'warning',
        'danger'
    ];
    const modifiers = ['block', 'outline', 'link'];
    const builtins = [...sizes, ...colors, ...modifiers];

    addThemeVariant(
        'button',
        {
            extends: ['default:interactive', 'button:md']
        },
        { default: true }
    );

    ['hover', 'focus', 'active'].forEach((state) => {
        addThemeVariant(
            `button:${state}`,
            {
                extends: [`default:interactive:${state}`]
            },
            { default: true }
        );
    });

    sizes.forEach((size) => {
        addThemeVariant(
            `button:${size}`,
            {
                extends: `box:wide:${size}`
            },
            { default: true }
        );
    });

    colors.forEach((color) => {
        addThemeVariant(
            `button:${color}`,
            {
                extends: `${color}:interactive`
            },
            { default: true }
        );

        ['hover', 'focus', 'active'].forEach((state) => {
            addThemeVariant(
                `button:${color}:${state}`,
                {
                    extends: [`${color}:interactive:${state}`]
                },
                { default: true }
            );
        });
    });

    return {
        builtins,
        colors,
        sizes
    };
}

export default defineComponent({
    name: componentName,
    components: {
        GridBox,
        Linkable,
        Loader
    },
    events: [
        /**
         * Emitted when the button is clicked
         * @event click
         */
        'click'
    ],
    props: {
        /**
         * The active state of the button
         * @param {boolean} active
         * @default false
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as a block, spanning the full container width
         * @param {boolean} block
         * @default false
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as a circle
         * @param {boolean} circle
         * @default false
         */
        circle: {
            type: Boolean,
            default: false
        },
        /**
         * The color variant of the button
         * @param {'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the button
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Renders the component as an anchor link with a `href` attribute
         * @param {string} to
         * @default undefined
         */
        href: {
            type: String,
            default: undefined
        },
        /**
         * Display the button as a link
         * @param {boolean} link
         * @default false
         */
        link: {
            type: Boolean,
            default: false
        },
        /**
         * The loading state of the button
         * @param {boolean} loading
         * @default false
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as an outline button
         * @param {boolean} outline
         * @default false
         */
        outline: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as a square
         * @param {boolean} square
         * @default false
         */
        square: {
            type: Boolean,
            default: false
        },
        /**
         * Set the HTML tag to be used for rendering the button
         * @param {string} tag
         * @default button
         */
        tag: {
            type: String,
            default: 'button'
        },
        /**
         * The tabindex of the button
         * @param {number | string} tabindex
         * @default 0
         */
        tabindex: {
            type: [Number, String] as PropType<number | string>,
            default: 0
        },
        /**
         * Renders the component as a Router Link component with a `to` attribute
         * @param {string} to
         * @default undefined
         */
        to: {
            type: [String, Object] as PropType<string | object>,
            default: undefined
        },
        /**
         * The type of the button
         * @param {'button' | 'submit' | 'reset' | string} type
         * @default
         */
        type: {
            type: String as PropType<'button' | 'submit' | 'reset' | string>,
            default: 'button'
        },
        /**
         * The size variant of the button
         * @param {'sm' | 'md' | 'lg'} size
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The variant of the button
         * @param {'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'} variant
         * @default
         */
        variant: {
            type: [String, Array] as PropType<string | string[]>,
            default: undefined
        }
    },
    setup(props) {
        const buttonGroup = inject(ButtonGroupKey, null);
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const rawColor = computed(() => props.color || buttonGroup?.color.value);
        const rawSize = computed(() => props.size || buttonGroup?.size.value);
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

        const { builtins } = useButtonVariants();

        const variants = computed(() => {
            const variantList = Array.isArray(props.variant)
                ? props.variant
                : (props.variant ?? '').split(/\s+/g);

            return [
                'button',
                ...variantList.map((v) => (builtins.includes(v) ? `button:${v}` : v))
            ];
        });

        const disabled = computed(() => {
            return (
                props.disabled ||
                props.loading ||
                buttonGroup?.disabled.value ||
                formGroup?.disabled.value ||
                form?.disabled.value
            );
        });

        const ariaBusy = computed(() => {
            if (role.value !== 'button') {
                return null;
            }
            return props.loading ? 'true' : null;
        });

        const ariaDisabled = computed(() => {
            return disabled.value ? 'true' : null;
        });

        const ariaPressed = computed(() => {
            if (role.value !== 'button') {
                return null;
            }
            return props.active ? 'true' : null;
        });

        const classes = computed(() => {
            return {
                [`-${color.value}`]: true,
                [`-${size.value}`]: true,
                '-active': props.active,
                '-block': props.block,
                '-circle': props.circle,
                '-square': props.square,
                '-disabled': disabled.value,
                '-link': props.link,
                '-outline': props.outline,
                '-loading': props.loading
            };
        });

        const role = computed(() => {
            if (props.tag === 'button' || props.tag === 'input') {
                return null;
            }

            return 'button';
        });

        const type = computed(() =>
            !(props.to || props.href) && (props.tag === 'button' || props.tag === 'input')
                ? props.type
                : null
        );

        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        return {
            classes,
            role,
            type,
            tabIndex,
            disabled,
            ariaDisabled,
            ariaPressed,
            ariaBusy,
            variants,
            component: markRaw(Linkable)
        };
    }
});
</script>

<template>
    <GridBox
        :to="to"
        :href="href"
        :is="component"
        class="button"
        :tag="tag"
        :inline="!block"
        justify-content="center"
        :class="classes"
        :role="role"
        :type="type"
        :tabindex="tabIndex"
        :disabled="disabled"
        :aria-disabled="ariaDisabled"
        :aria-pressed="ariaPressed"
        :aria-busy="ariaBusy"
        aria-live="polite"
        :variant="variants"
    >
        <template v-if="loading">
            <slot name="loading-icon">
                <!-- @slot loading-icon Slot for button loading icon -->
                <Loader class="button-icon" />
            </slot>
            <span v-if="$slots.loading" class="button-content">
                <!-- @slot loading Slot for button loading text -->
                <slot name="loading" />
            </span>
        </template>
        <template v-else>
            <span v-if="$slots.icon" class="button-icon">
                <!-- @slot icon Slot for button icon -->
                <slot name="icon" />
            </span>
            <span v-if="$slots.default" class="button-content">
                <!-- @slot default Slot for default button content -->
                <slot />
            </span>
        </template>
    </GridBox>
</template>
