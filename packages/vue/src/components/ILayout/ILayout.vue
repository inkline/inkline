<script lang="ts">
import { computed, defineComponent } from 'vue';

const componentName = 'ILayout';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * Display the layout on a vertical orientation
         * @type Boolean
         * @default false
         * @name vertical
         */
        vertical: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const classes = computed(() => ({
            '-vertical': props.vertical
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <main v-bind="$attrs" class="layout" :class="classes">
        <!-- @slot default Slot for default layout content -->
        <slot />
    </main>
</template>
