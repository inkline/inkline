<script lang="ts">
import { computed, defineComponent } from 'vue';

const componentName = 'IContainer';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
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
    setup(props) {
        const classes = computed(() => ({
            '-fluid': props.fluid
        }));

        return { classes };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="container" :class="classes">
        <!-- @slot default Slot for default container content -->
        <slot />
    </div>
</template>
