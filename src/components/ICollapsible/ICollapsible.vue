<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, provide, computed, watch } from 'vue';
import { CollapsibleKey } from '@inkline/inkline/constants';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'ICollapsible';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * Display the collapsible as an accordion, keeping a maximum of one open collapsible item
         * @type Boolean
         * @default false
         * @name accordion
         */
        accordion: {
            type: Boolean,
            default: false
        },
        /**
         * The color variant of the collapsible
         * @type light | dark | transparent
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the collapsible
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Used to determine which collapsible item is open
         * @type String[]
         * @default
         * @name modelValue
         */
        modelValue: {
            type: Array as PropType<string[]>,
            default: (): string[] => []
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
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value)
        }));

        const activeItems = ref(([] as string[]).concat(props.modelValue)); // eslint-disable-line vue/no-setup-props-destructure

        watch(
            () => props.modelValue,
            (value: string[]) => {
                activeItems.value = ([] as string[]).concat(value);
            }
        );

        provide(CollapsibleKey, {
            activeItems,
            onItemClick
        });

        function onItemClick(id: string) {
            if (props.accordion) {
                activeItems.value = activeItems.value.indexOf(id) > -1 ? [] : [id];

                return;
            }

            const index = activeItems.value.indexOf(id);

            if (index > -1) {
                activeItems.value.splice(index, 1);
            } else {
                activeItems.value.push(id);
            }

            emit('update:modelValue', activeItems.value);
        }

        return {
            classes
        };
    }
});
</script>

<template>
    <div
        v-bind="$attrs"
        class="collapsible"
        :class="classes"
        role="tablist"
        aria-multiselectable="true"
    >
        <!-- @slot Default slot for collapsible items -->
        <slot />
    </div>
</template>
