<script lang="ts">
import { computed, defineComponent, inject, toRef } from 'vue';
import { TabsKey } from '@inkline/types';

const componentName = 'Tab';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The name of the referenced tab panel
         * @param {string} name
         * @default
         */
        name: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const tabs = inject(TabsKey, null);

        const name = toRef(props, 'name');
        const active = computed(() => tabs?.active.value === props.name);
        const color = computed(() => tabs?.color.value);
        const size = computed(() => tabs?.size.value);
        const classes = computed(() => ({
            '-active': active.value,
            [`-${color.value}`]: color.value,
            [`-${size.value}`]: size.value
        }));

        function onClick() {
            tabs?.setActive(props.name);
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                tabs?.setActive(props.name);
            }
        }

        return {
            name,
            active,
            classes,
            onClick,
            onKeyDown
        };
    }
});
</script>

<template>
    <div
        class="tab"
        :class="classes"
        role="tab"
        :id="`tab-${name}`"
        :aria-selected="active ? 'true' : 'false'"
        :aria-controls="`tab-panel-${name}`"
        :aria-describedby="`tab-panel-${name}`"
        tabindex="0"
        @click="onClick"
        @keydown="onKeyDown"
    >
        <!-- @slot default Slot for tab content -->
        <slot />
    </div>
</template>
