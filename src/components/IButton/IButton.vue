<script lang="ts" setup>
import {computed, inject} from 'vue';
import {
    useComponentColor,
    useComponentSize,
    useFormState,
    useLinkable
} from '@inkline/inkline/composables';
import ILoader from '@inkline/inkline/components/ILoader/index.vue';
import {ButtonGroupKey} from "@inkline/inkline/components/IButtonGroup/mixin";

const componentName = 'IButton';

// TODO: prop descriptions
const props = defineProps({
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
     * @default light
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
     *
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
     *
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
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: undefined
    }
});

const buttonGroup = inject(ButtonGroupKey);

const componentColor = useComponentColor({ componentName, currentColor: props.color });
const componentSize = useComponentSize({ componentName, currentSize: props.size || buttonGroup?.size.value });
const { disabled, size } = useFormState({
    disabled: buttonGroup?.disabled.value || props.disabled,
    size: componentSize.value
});
const { tag } = useLinkable({ to: props.to, href: props.href, tag: props.tag });

const ariaBusy = computed(() => {
    if (role.value !== 'button') {
        return null;
    }
    return props.loading ? 'true' : null;
});

const ariaDisabled = computed(() => {
    return props.disabled ? 'true' : null;
});

const ariaPressed = computed(() => {
    if (role.value !== 'button') {
        return null;
    }
    return props.active ? 'true' : null;
});

const classes = computed(() => {
    return {
        [`-${componentColor.value}`]: true,
        [`-${size.value}`]: true,
        '-active': props.active,
        '-block': props.block,
        '-circle': props.circle,
        '-disabled': isDisabled.value,
        '-link': props.link,
        '-outline': props.outline,
        '-loading': props.loading
    };
});

const isDisabled = computed(() => {
    return props.disabled || disabled.value || props.loading;
});

const role = computed(() => (props.to || props.href ? 'link' : 'button'));
const tabIndex = computed(() => (isDisabled.value ? -1 : props.tabindex));
</script>

<template>
    <component
        v-bind="$attrs"
        :is="tag"
        class="button"
        :tag="tag"
        :role="role"
        :tabindex="tabIndex"
        :class="classes"
        :disabled="isDisabled"
        :aria-disabled="ariaDisabled"
        :aria-pressed="ariaPressed"
        :aria-busy="ariaBusy"
        aria-live="polite"
    >
        <!--** Slot for default button content -->
        <slot v-if="loading" name="loading">
            <i-loader />
        </slot>
        <!--** Slot for button loading state -->
        <slot v-if="!loading" />
    </component>
</template>
