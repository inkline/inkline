<script lang="ts">
import { computed, defineComponent, onMounted, provide, ref, watch } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import { TabsKey } from '@inkline/inkline/constants';
import { TabTitle } from '@inkline/inkline/components/TabTitle';

type InklineTab = {
    name: string;
    title: string;
};

const componentName = 'Tabs';

export default defineComponent({
    name: componentName,
    components: { TabTitle },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the tabs
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * Used to set the currently active tab
         * @type String
         * @default
         * @name modelValue
         */
        modelValue: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the tabs
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Display the tabs header as full width
         * @type Boolean
         * @default false
         * @name stretch
         */
        stretch: {
            type: Boolean,
            default: false
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    setup(props, { emit, slots }) {
        const tabsRef = ref<HTMLElement | null>(null);
        const tabs = ref<InklineTab[]>([]);
        const active = ref(props.modelValue);

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-stretch': props.stretch
        }));

        watch(
            () => props.modelValue,
            (value) => {
                active.value = value;
            }
        );

        provide(TabsKey, {
            active,
            setActive,
            synchronize
        });

        onMounted(() => {
            if (active.value === '' && tabs.value[0]) {
                setActive(tabs.value[0].name);
            }
        });

        function setActive(id: string) {
            active.value = id;
            emit('update:modelValue', active.value);
        }

        function synchronize() {
            if (tabsRef.value && !slots.header) {
                const currentTabs: InklineTab[] = [];
                const tabNodes = tabsRef.value.querySelectorAll('.tab');

                for (const tabNode of tabNodes) {
                    const name = tabNode.getAttribute('name')!;
                    const title = tabNode.getAttribute('title') || name;

                    currentTabs.push({ name, title });
                }

                tabs.value = currentTabs;
            }
        }

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
    <div
        v-bind="$attrs"
        ref="tabsRef"
        class="tabs"
        :class="classes"
        role="tablist"
        aria-multiselectable="true"
    >
        <div class="tabs-header">
            <!-- @slot header Slot for tabs header -->
            <slot name="header">
                <TabTitle v-for="tab in tabs" :key="tab.name" :for="tab.name">
                    {{ tab.title }}
                </TabTitle>
            </slot>
        </div>

        <!-- @slot default Slot for tab components -->
        <slot />
    </div>
</template>
