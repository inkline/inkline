<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue';
import { SelectKey } from '@inkline/inkline/constants';
import { SelectOption } from '@inkline/inkline/components/ISelect/types';
import IRenderResolver from '@inkline/inkline/components/utils/IRenderResolver/IRenderResolver';

const componentName = 'ISelectOption';

export default defineComponent({
    name: componentName,
    components: { IRenderResolver },
    inheritAttrs: false,
    props: {
        /**
         * The label of the select option. Can be a string, number, render function, or component
         * @type String | Number | Boolean | Function | Object
         * @default undefined
         * @name label
         */
        label: {
            type: [String, Number, Boolean, Function, Object] as PropType<SelectOption['label']>,
            default: undefined
        },
        /**
         * The tabindex of the list group item
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * The select option
         * @type Object
         * @default { id: '' }
         * @name option
         */
        option: {
            type: Object as PropType<SelectOption>,
            default: (): SelectOption => ({
                id: ''
            })
        }
    },
    setup(props) {
        const select = inject(SelectKey, null);

        const isDisabled = computed(() => props.option.disabled || select?.disabled.value);

        const isActive = computed(() => {
            const idField = select?.idField.value;
            return props.option.active || props.option[idField] === select?.value.value;
        });

        const ariaDisabled = computed(() => (isDisabled.value ? true : undefined));
        const ariaSelected = computed(() => (isActive.value ? true : undefined));

        const classes = computed(() => ({
            '-active': isActive.value,
            '-disabled': isDisabled.value
        }));

        const tabIndex = computed(() => (isDisabled.value ? -1 : props.tabindex));

        function onClick() {
            if (isDisabled.value) {
                return;
            }

            if (select && props.option) {
                select.onInput(props.option);
            }
        }

        return {
            ariaDisabled,
            ariaSelected,
            classes,
            tabIndex,
            onClick
        };
    }
});
</script>

<template>
    <div
        v-bind="$attrs"
        class="select-option"
        :class="classes"
        role="option"
        :tabindex="tabIndex"
        :aria-disabled="ariaDisabled"
        :aria-selected="ariaSelected"
        @click="onClick"
    >
        <!-- @slot default Slot for select option label -->
        <slot>
            <IRenderResolver :render="label" :ctx="option" />
        </slot>
    </div>
</template>
