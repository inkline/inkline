<script lang="ts">
import { defineComponent } from 'vue';
import {
    computedPropValue,
    computedColorValue,
    sizePropValidator, computedSizeValue
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default progress content
 * @name default
 * @kind slot
 */

const componentName = 'IProgress';

export default defineComponent({
    name: componentName,
    provide () {
        return {
            progress: this
        };
    },
    props: {
        /**
         * The color variant of the progress component
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The value to consider as the 0% starting point
         * @type Number
         * @default 0
         * @name min
         */
        min: {
            type: [String, Number],
            default: 0
        },
        /**
         * The value to consider as the 100% ending point
         * @type Number
         * @default 100
         * @name max
         */
        max: {
            type: [String, Number],
            default: 100
        },
        /**
         * The size variant of the progress component
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
                [`-${this.computedSize}`]: Boolean(this.computedSize)
            };
        }
    }
});
</script>

<template>
    <div class="progress" :class="classes">
        <slot />
    </div>
</template>