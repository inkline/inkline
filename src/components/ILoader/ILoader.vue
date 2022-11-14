<script lang="ts">
import { defineComponent } from 'vue';
import { computedColorValue, computedSizeValue } from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default loader content
 * @name default
 * @kind slot
 */

const componentName = 'ILoader';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the loader
         * @type primary | light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the loader
         * @type sm | md | lg | auto
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
    <div class="loader" :class="classes" role="img" aria-hidden="true">
        <span v-if="$slots.default" class="loader-text">
            <slot />
        </span>
        <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
        </svg>
    </div>
</template>