<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { ButtonGroupKey, FormKey, FormGroupKey } from '@inkline/types';
import { Linkable } from '@inkline/component-linkable';
import { Loader } from '@inkline/component-loader';

const componentName = 'Button';

export default defineComponent({
    name: componentName,
    components: {
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
         * Display the button loading icon when loading state is active
         * @param {boolean} showLoadingIcon
         * @default true
         */
        showLoadingIcon: {
            type: Boolean,
            default: true
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
            ariaBusy
        };
    }
});
</script>

<template>
    <Linkable
        :to="to"
        :href="href"
        :tag="tag"
        class="button"
        :class="classes"
        :role="role"
        :type="type"
        :tabindex="tabIndex"
        :disabled="disabled"
        :aria-disabled="ariaDisabled"
        :aria-pressed="ariaPressed"
        :aria-busy="ariaBusy"
        aria-live="polite"
    >
        <template v-if="loading">
            <Loader v-if="showLoadingIcon" class="button-icon" />
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
    </Linkable>
</template>
