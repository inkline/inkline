<script lang="ts" setup>
import {computed, defineComponent} from 'vue';
import {
    computedColorValue,
    computedSizeValue
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';
import {useComponentColor, useComponentSize} from "@inkline/inkline/composables";

const componentName = 'IHamburgerMenu';

const props = defineProps({
    /**
     * The animation of the hamburger menu
     * @type close | arrow-up | arrow-down | arrow-left | arrow-right | plus | minus
     * @default close
     * @name animation
     */
    animation: {
        type: String,
        default: 'close'
    },
    /**
     * The color variant of the hamburger menu
     * @type light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * The size variant of the hamburger menu
     * @type sm | md | lg
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: ''
    },
    /**
     * Used to set the hamburger menu as opened or closed
     * @type Boolean
     * @default false
     * @name modelValue
     */
    modelValue: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits([
    /**
     * Event emitted for setting the modelValue
     * @event update:modelValue
     */
    'update:modelValue'
]);

const currentColor = computed(() => props.color);
const currentSize = computed(() => props.size);
const { color } = useComponentColor({ componentName, currentColor });
const { size } = useComponentSize({ componentName, currentSize });

const classes = computed(() => ({
    [`-${color.value}`]: true,
    [`-${size.value}`]: true,
    [`-${props.animation}`]: Boolean(props.animation),
    '-active': props.modelValue
}));

function onClick () {
    emit('update:modelValue', !props.modelValue);
}
</script>

<template>
    <div class="hamburger-menu" :class="classes" @click="onClick">
        <span class="hamburger-menu-bars"></span>
    </div>
</template>
