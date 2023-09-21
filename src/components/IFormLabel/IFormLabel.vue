<script lang="ts">
import { computed, defineComponent, inject, ref, toRef } from 'vue';
import { useComponentSize } from '@inkline/inkline/composables';
import { FormKey, FormGroupKey } from '@inkline/inkline';

const componentName = 'IFormLabel';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input
         * @type String
         * @default
         * @name for
         */
        for: {
            type: String,
            default: ''
        },
        /**
         * The placement of the form label
         * @type left | right
         * @default left
         * @name placement
         */
        placement: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the form label
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: 'md'
        }
    },
    setup(props) {
        const labelRef = ref<HTMLLabelElement | null>(null);

        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentFor = toRef(props, 'for');

        const currentSize = computed(() => props.size || formGroup?.size.value || form?.size.value);
        const { size } = useComponentSize({ componentName, currentSize });

        const classes = computed(() => ({
            [`-${size.value}`]: true,
            [`-${props.placement}`]: Boolean(props.placement)
        }));

        function onClick() {
            if (props.for) {
                return;
            }

            if (labelRef.value) {
                const nextSibling = labelRef.value?.nextSibling as HTMLElement;

                (nextSibling?.querySelector('input, textarea') as HTMLElement)?.focus?.();
            }
        }

        return {
            labelRef,
            currentFor,
            classes,
            onClick
        };
    }
});
</script>

<template>
    <label
        v-bind="$attrs"
        ref="labelRef"
        class="form-label"
        :class="classes"
        :for="currentFor"
        @click="onClick"
    >
        <!-- @slot default Slot for default form label content  -->
        <slot />
    </label>
</template>
