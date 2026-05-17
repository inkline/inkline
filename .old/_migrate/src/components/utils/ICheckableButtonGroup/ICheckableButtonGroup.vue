<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import ButtonGroup from '@inkline/inkline/components/ButtonGroup/ButtonGroup.vue';
import type { CheckableButtonGroupVariant } from '@inkline/inkline/components/utils';

const componentName = 'CheckableButtonGroup';

export default defineComponent({
    name: componentName,
    components: { ButtonGroup },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the checkable buttons
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The size variant of the checkable buttons
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The type of the checkable buttons
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        type: {
            type: String as PropType<'checkbox' | 'radio'>,
            required: true
        },
        /**
         * The style variant of the checkable buttons
         * @type default | group
         * @default default
         * @name variant
         */
        variant: {
            type: String as PropType<CheckableButtonGroupVariant>,
            default: 'default'
        }
    },
    setup(props) {
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const classes = computed(() => ({
            'checkable-button-group': true,
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            [`-${props.type}`]: true,
            [`-${props.variant}`]: true
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <ButtonGroup v-if="variant === 'group'" :class="classes" v-bind="$attrs">
        <slot />
    </ButtonGroup>
    <div v-else :class="classes" v-bind="$attrs">
        <!-- @slot default Slot for default content -->
        <slot />
    </div>
</template>
