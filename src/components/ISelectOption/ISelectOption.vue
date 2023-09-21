<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue';
import { SelectKey } from '@inkline/inkline';
import { SelectOption } from '@inkline/inkline/components/ISelect/mixin';

const componentName = 'ISelectOption';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The active state of the select option
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the select option
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The label of the select option
         * @type String
         * @default ''
         * @name label
         */
        label: {
            type: String,
            default: ''
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
         * @type Object | String | Number
         * @default {}
         * @name value
         */
        value: {
            type: Object as PropType<SelectOption>,
            default: (): SelectOption => ({
                label: '',
                value: ''
            })
        }
    },
    setup(props) {
        const select = inject(SelectKey, null);

        const ariaDisabled = computed(() => (props.disabled ? true : undefined));
        const ariaSelected = computed(() => (props.disabled ? true : undefined));

        const isActive = computed(() => {
            const idField = select?.idField.value;
            if (!idField) {
                return props.active;
            }

            return props.active || props.value[idField] === select?.value.value;
        });

        const classes = computed(() => ({
            '-active': isActive.value,
            '-disabled': props.disabled
        }));

        const tabIndex = computed(() => (props.disabled ? -1 : props.tabindex));

        function onClick() {
            if (props.disabled) {
                return;
            }

            if (select && props.value) {
                select.onInput(props.value);
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
        <slot> {{ label || value.label }} </slot>
    </div>
</template>
