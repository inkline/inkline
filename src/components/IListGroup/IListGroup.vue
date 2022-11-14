<script lang="ts">
import { defineComponent } from 'vue';
import {
    computedPropValue,
    computedColorValue,
    sizePropValidator, computedSizeValue
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default list group content
 * @name default
 * @kind slot
 */

const componentName = 'IListGroup';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * Display the list group border
         * @type Boolean
         * @default true
         * @name border
         */
        border: {
            type: Boolean,
            default: true
        },
        /**
         * The color variant of the list group
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the list group
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        computedColor (): string | undefined {
            return computedColorValue(componentName, this.color);
        },
        computedSize (): string | undefined {
            return computedSizeValue(componentName, this.size);
        },
        classes (): Classes {
            return {
                [`-${this.computedColor}`]: Boolean(this.computedColor),
                [`-${this.computedSize}`]: Boolean(this.computedSize),
                '-border': this.border
            };
        }
    }
});
</script>

<template>
    <div class="list-group" :class="classes" role="list">
        <slot />
    </div>
</template>