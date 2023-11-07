<script lang="ts">
import type { PropType} from 'vue';
import { computed, defineComponent, inject, toRef } from 'vue';
import { useComponentColor, useComponentSize, useLinkable } from '@inkline/inkline/composables';
import { ILoader } from '@inkline/inkline/components/ILoader';
import { ButtonGroupKey, FormKey, FormGroupKey } from '@inkline/inkline/constants';

const componentName = 'IButton';

export default defineComponent({
    name: componentName,
    components: {
        ILoader
    },
    events: [
        /**
         * Emitted when the button is clicked
         * @event click
         */
        'click'
    ],
    inheritAttrs: false,
    props: {
        /**
         * The active state of the button
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as a block, spanning the full container width
         * @type Boolean
         * @default false
         * @name block
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as a circle
         * @type Boolean
         * @default false
         * @name circle
         */
        circle: {
            type: Boolean,
            default: false
        },
        /**
         * The color variant of the button
         * @type primary | success | light | dark | info | success | warning | danger
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the button
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Renders the component as an anchor link with a `href` attribute
         * @type String
         * @default undefined
         * @name to
         */
        href: {
            type: String,
            default: undefined
        },
        /**
         * Display the button as a link
         * @type Boolean
         * @default false
         * @name link
         */
        link: {
            type: Boolean,
            default: false
        },
        /**
         * The loading state of the button
         * @type Boolean
         * @default false
         * @name loading
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button loading icon when loading state is active
         * @type Boolean
         * @default true
         * @name showLoadingIcon
         */
        showLoadingIcon: {
            type: Boolean,
            default: true
        },
        /**
         * Display the button as an outline button
         * @type Boolean
         * @default false
         * @name outline
         */
        outline: {
            type: Boolean,
            default: false
        },
        /**
         * Set the HTML tag to be used for rendering the button
         * @type String
         * @default button
         * @name tag
         */
        tag: {
            type: String,
            default: 'button'
        },
        /**
         * The tabindex of the button
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String] as PropType<number | string>,
            default: 0
        },
        /**
         * Renders the component as a Router Link component with a `to` attribute
         * @type String
         * @default undefined
         * @name to
         */
        to: {
            type: [String, Object] as PropType<string | object>,
            default: undefined
        },
        /**
         * The type of the button
         * @type button | submit | reset | undefined
         * @default
         * @name type
         */
        type: {
            type: String as PropType<'button' | 'submit' | 'reset' | string>,
            default: 'button'
        },
        /**
         * The size variant of the button
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        }
    },
    setup(props, { attrs }) {
        const buttonGroup = inject(ButtonGroupKey, null);
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = computed(() => props.color || buttonGroup?.color.value);
        const currentSize = computed(() => props.size || buttonGroup?.size.value);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const to = toRef(props, 'to');
        const href = toRef(props, 'href');
        const currentTag = toRef(props, 'tag');
        const { tag, isLink } = useLinkable({ to, href, tag: currentTag });

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
            !isLink.value && (props.tag === 'button' || props.tag === 'input') ? props.type : null
        );

        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        const bindings = computed(() => ({
            ...attrs,
            ...(to.value ? { to: to.value } : href.value ? { href: href.value } : {}),
            role: role.value,
            type: type.value,
            tabindex: tabIndex.value,
            disabled: disabled.value,
            'aria-disabled': ariaDisabled.value,
            'aria-pressed': ariaPressed.value,
            'aria-busy': ariaBusy.value,
            'aria-live': 'polite'
        }));

        return {
            bindings,
            classes,
            currentTag,
            tag
        };
    }
});
</script>

<template>
    <component v-bind="bindings" :is="tag" :tag="currentTag" class="button" :class="classes">
        <template v-if="loading">
            <ILoader v-if="showLoadingIcon" class="button-icon" />
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
    </component>
</template>
