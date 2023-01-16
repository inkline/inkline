<script lang="ts">
import { computed, defineComponent, onMounted, provide, ref, watch } from "vue";
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import { TabsKey } from '@inkline/inkline/components/ITabs/mixin';
import { ITabTitle } from "@inkline/inkline/components/ITabTitle";

const componentName = 'ITabs';

export default defineComponent({
    name: componentName,
    components: { ITabTitle },
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
         * @name size
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
    setup(props, { emit }) {
        const tabs = ref<Array<Record<string, string>>>([]);
        const active = ref(props.modelValue);

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

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
            registerTab,
            unregisterTab
        });

        onMounted(() => {
            if (active.value === '') {
                setActive(tabs.value[0].id);
            }
        });

        function setActive(id: string) {
            active.value = id;
            emit('update:modelValue', active.value);
        }

        function registerTab(id: string, title: string) {
            if (!tabs.value.find((tab) => tab.id === id)) {
                tabs.value.push({ id, title });
            }
        }

        function unregisterTab(id: string) {
            tabs.value = tabs.value.filter((tab) => tab.id !== id);
        }

        return {
            tabs,
            active,
            classes,
            setActive
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="tabs" :class="classes" role="tablist" aria-multiselectable="true">
        <div class="tabs-header">
            <!-- @slot header Slot for tabs header -->
            <slot name="header">
                <ITabTitle v-for="tab in tabs" :key="tab.id" :for="tab.id">{{ tab.title }}</ITabTitle>
            </slot>
        </div>

        <!-- @slot default Slot for tab components -->
        <slot />
    </div>
</template>
