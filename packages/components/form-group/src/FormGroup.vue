<script lang="ts">
import { computed, defineComponent, provide, toRef } from 'vue';
import type { PropType } from 'vue';
import {
    useFormComponentColor,
    useFormComponentSize,
    useFormGroupValidation
} from '@inkline/composables';
import { FormGroupKey, FormStateKeys } from '@inkline/types';

const componentName = 'FormGroup';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the form group
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the form group
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Display the form group as inline
         * @type Boolean
         * @default false
         * @name inline
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The identifier of the form group
         * @type String
         * @default
         * @name name
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * The readonly state of the form group
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The required state of the form group
         * @type Boolean
         * @default false
         * @name required
         */
        required: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the form group
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Enable form validation using schema
         * @type Boolean
         * @default true
         * @name shouldValidate
         */
        shouldValidate: {
            type: Boolean,
            default: true
        },
        /**
         * The error state of the input, computed based on schema by default.
         * @type Boolean | Array
         * @default undefined
         * @name errorCondition
         */
        errorCondition: {
            type: [Boolean, Array] as PropType<boolean | FormStateKeys[]>,
            default: undefined
        }
    },
    setup(props) {
        const name = toRef(props, 'name');
        const disabled = toRef(props, 'disabled');
        const readonly = toRef(props, 'readonly');
        const shouldValidate = toRef(props, 'shouldValidate');
        const errorCondition = toRef(props, 'errorCondition');
        const { hasError, isDisabled, isReadonly, onBlur, onInput } = useFormGroupValidation({
            name,
            disabled,
            readonly,
            errorCondition,
            shouldValidate
        });

        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useFormComponentColor(componentName, rawColor);
        const { size } = useFormComponentSize(componentName, rawSize);

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': isDisabled.value,
            '-readonly': isReadonly.value,
            '-inline': props.inline,
            '-error': hasError.value,
            '-required': props.required // @TODO Add required state based on required validator this.input.schema?.validators.some(v => v.name === 'required')
        }));

        provide(FormGroupKey, {
            disabled: isDisabled,
            readonly: isReadonly,
            size,
            color,
            errorCondition,
            onBlur,
            onInput
        });

        return {
            classes
        };
    }
});
</script>

<template>
    <fieldset v-bind="$attrs" class="form-group" :class="classes" :name="name" role="group">
        <!-- @slot default Slot for default form group content -->
        <slot />
    </fieldset>
</template>
