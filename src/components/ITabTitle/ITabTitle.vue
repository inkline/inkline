<script lang="ts">
import { computed, defineComponent, inject, toRef } from 'vue';
import { uid } from '@grozav/utils';
import { TabsKey } from '@inkline/inkline/components/ITabs/mixin';

const componentName = 'ITabTitle';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The name of the referenced tab
         * @type String
         * @default
         * @name for
         */
        for: {
            type: String,
            default(): string {
                return uid('tab');
            }
        }
    },
    setup(props) {
        const tabs = inject(TabsKey, null);

        const name = toRef(props, 'for');
        const active = computed(() => tabs?.active.value === props.for);
        const classes = computed(() => ({
            '-active': active.value
        }));

        function onClick() {
            tabs?.setActive(props.for);
        }

        return {
            name,
            active,
            classes,
            onClick
        };
    }
});
</script>

<template>
    <div
        class="tab-title"
        :class="classes"
        role="tab"
        :for="name"
        :active="active"
        :aria-expanded="active"
        :aria-controls="`tab-content-${name}`"
        :aria-describedby="`tab-content-${name}`"
        tabindex="0"
        @click="onClick"
    >
        <!-- @slot default Slot for tab title content -->
        <slot />
    </div>
</template>
