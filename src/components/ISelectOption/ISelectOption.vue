<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { SelectKey } from '@inkline/inkline/components/ISelect/mixin';

const componentName = 'ISelectOption';

export default defineComponent({
    name: componentName,
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
         * The select option value
         * @type Object | String | Number
         * @default {}
         * @name value
         */
        value: {
            type: [Object, String, Number],
            default: (): any => ({})
        }
    },
    setup(props) {
        const select = inject(SelectKey, null);

        const ariaDisabled = computed(() => (props.disabled ? 'true' : null));
        const ariaSelected = computed(() => (props.disabled ? 'true' : null));

        const isActive = computed(() => props.active || props.value === select?.value.value);

        const classes = computed(() => ({
            '-active': isActive.value,
            '-disabled': props.disabled
        }));

        const tabIndex = computed(() => (props.disabled ? -1 : props.tabindex));

        function onClick() {
            if (!props.disabled) {
                select?.onInput(props.value, props.label);
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
        <slot> {{ label }} </slot>
    </div>
</template>
