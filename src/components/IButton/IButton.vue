<script lang="ts">
import { computed, defineComponent, inject, toRef } from 'vue';
import { useComponentColor, useComponentSize, useLinkable } from '@inkline/inkline/composables';
import { ILoader } from '@inkline/inkline/components/ILoader';
import { ButtonGroupKey } from '@inkline/inkline/components/IButtonGroup/mixin';
import { FormKey } from '../IForm';
import { FormGroupKey } from '../IFormGroup';

const componentName = 'IButton';

export default defineComponent({
    name: componentName,
    components: {
        ILoader
    },
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
         * @type primary | success | light | dark | info | success | warning | danger | facebook | google | twitter | github
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
            type: [Number, String],
            default: 0
        },
        /**
         * Renders the component as a Router Link component with a `to` attribute
         * @type String
         * @default undefined
         * @name to
         */
        to: {
            type: [String, Object],
            default: undefined
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
    setup(props) {
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
        const { tag: isTag } = useLinkable({ to, href, tag: currentTag });

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

        const role = computed(() => (props.to || props.href ? 'link' : 'button'));
        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        return {
            ariaBusy,
            ariaDisabled,
            ariaPressed,
            disabled,
            isTag,
            role,
            tabIndex,
            classes
        };
    }
});
</script>

<template>
    <component
        v-bind="$attrs"
        :is="isTag"
        class="button"
        :to="to"
        :href="href"
        :tag="tag"
        :role="role"
        :tabindex="tabIndex"
        :class="classes"
        :disabled="disabled"
        :aria-disabled="ariaDisabled"
        :aria-pressed="ariaPressed"
        :aria-busy="ariaBusy"
        aria-live="polite"
    >
        <!-- @slot loading Slot for button loading state -->
        <slot v-if="loading" name="loading">
            <i-loader />
        </slot>
        <!-- @slot default Slot for default button content -->
        <slot v-if="!loading" />
    </component>
</template>
