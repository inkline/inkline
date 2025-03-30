<script lang="ts">
import { computed, defineComponent, ref, inject, onMounted } from 'vue';
import { TabsKey } from '@inkline/types';

const componentName = 'TabPanel';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The name of the tab panel, used as an identifier
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

        const active = computed(() => tabs?.active.value === props.name);
        const color = computed(() => tabs?.color.value);
        const classes = computed(() => ({
            '-active': active.value,
            [`-${color.value}`]: color.value
        }));

        // Delay the hiding of the tab content to allow for crawling by search engines
        const isMounted = ref(false);
        const showForSEO = computed(() => tabs?.seo.value && !isMounted.value);

        onMounted(() => {
            setTimeout(() => {
                isMounted.value = true;
            });
        });

        return {
            showForSEO,
            active,
            classes
        };
    }
});
</script>

<template>
    <div
        v-show="active || showForSEO"
        class="tab-panel"
        :class="classes"
        role="tabpanel"
        :id="`tab-panel-${name}`"
        :aria-hidden="active ? 'false' : 'true'"
        :aria-labelledby="`tab-${name}`"
    >
        <!-- @slot default Slot for tab content -->
        <slot />
    </div>
</template>
