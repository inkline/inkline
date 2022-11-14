<script lang="ts">
import { defineComponent } from 'vue';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default container content
 * @name default
 * @kind slot
 */

const componentName = 'IContainer';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * Display the container as fluid, always spanning 100% width
         * @type Boolean
         * @default false
         * @name fluid
         */
        fluid: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes (): Classes {
            return {
                '-fluid': this.fluid
            };
        }
    }
});
</script>

<template>
    <div class="container" :class="classes">
        <slot />
    </div>
</template>