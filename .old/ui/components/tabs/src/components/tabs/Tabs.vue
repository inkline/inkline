<script lang="ts">
import { computed, defineComponent, provide, toRef, ref, watch } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { TabsKey } from '@inkline/types';
import { TabItem } from '../../types';

const componentName = 'Tabs';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the tabs
         * @param {'light' | 'dark'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * Used to set the currently active tab
         * @param {string} modelValue
         * @default
         */
        modelValue: {
            type: String,
            default: ''
        },
        /**
         * Delay the hiding of the tab content to allow for crawling by search engines
         * @param {boolean} seo
         * @default true
         */
        seo: {
            type: Boolean,
            default: true
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    setup(props, { emit }) {
        const tabsRef = ref<HTMLElement | null>(null);
        const tabs = ref<TabItem[]>([]);
        const active = ref(props.modelValue);
        const seo = ref(props.seo);

        const rawColor = toRef(props, 'color');
        const { color } = useComponentColor(componentName, rawColor);

        const classes = computed(() => ({
            [`-${color.value}`]: true
        }));

        function setActive(id: string) {
            active.value = id;
            emit('update:modelValue', active.value);
        }

        watch(
            () => props.modelValue,
            (value) => {
                active.value = value;
            }
        );

        provide(TabsKey, {
            active,
            seo,
            color,
            setActive
        });

        return {
            tabs,
            tabsRef,
            active,
            classes,
            setActive
        };
    }
});
</script>

<template>
    <div ref="tabsRef" class="tabs" :class="classes">
        <!-- @slot default Slot for tab components -->
        <slot />
    </div>
</template>
