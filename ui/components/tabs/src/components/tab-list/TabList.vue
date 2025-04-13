<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { TabsKey } from '@inkline/types';

const componentName = 'TabList';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * Stretch tab list to fill container width
         * @param {boolean} stretch
         * @default false
         */
        stretch: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const tabs = inject(TabsKey, null);

        const color = computed(() => tabs?.color.value);
        const classes = computed(() => ({
            '-stretch': props.stretch,
            [`-${color.value}`]: color.value
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <div class="tab-list" :class="classes" role="tablist">
        <!-- @slot default Slot for tab list items -->
        <slot />
    </div>
</template>
