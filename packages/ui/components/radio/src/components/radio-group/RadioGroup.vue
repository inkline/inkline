<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, provide, toRef } from 'vue';
import { uid } from '@inkline/utils';
import {
    useFormComponentColor,
    useFormComponentSize,
    useFormInputValidation
} from '@inkline/composables';
import { RadioGroupKey, type FormStateKeys } from '@inkline/types';
import type { RadioGroupOption } from '@inkline/types';
import { Radio } from '../radio';

const componentName = 'RadioGroup';

export default defineComponent({
    name: componentName,
    components: { Radio },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the radio group
         * @param {'light' | 'dark'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the radio group
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The error state of the input, computed based on schema by default.
         * @param {boolean | FormStateKeys[]} error
         * @default ['touched', 'dirty', 'invalid']
         */
        errorCondition: {
            type: [Boolean, Array] as PropType<boolean | FormStateKeys[]>,
            // @TODO use propDefaultValue to set default value
            default: undefined
        },
        /**
         * Display the radio group as inline
         * @param {boolean} inline
         * @default false
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The indeterminate state of the radio group
         * @param {boolean} indeterminate
         * @default false
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * The fallback label of the radio group. Can be a string, number, render function, or component
         * @param {string | number | boolean | Function | Object} label
         * @default undefined
         */
        label: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                RadioGroupOption['label']
            >,
            default: undefined
        },
        /**
         * Used to set the radio group value
         * @default
         * @name modelValue
         */
        modelValue: {
            type: [String, Number, Boolean] as PropType<string | number | boolean>,
            default: undefined
        },
        /**
         * The unique identifier of the radio group
         * @param {string} name
         * @default uid()
         */
        name: {
            type: String,
            default: () => {
                return uid('radio-group');
            }
        },
        /**
         * Displays the native browser radio input indicator
         * @param {boolean} native
         * @default false
         */
        native: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the radio group
         * @param {boolean} readonly
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the radio group
         * @param {'sm' | 'md' | 'lg'} sizeMultiplier
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Enable checkbox group validation using schema
         * @param {boolean} validateSchema
         * @default true
         */
        shouldValidate: {
            type: Boolean,
            default: true
        },
        /**
         * The options of the radio group
         * @param {Array} options
         * @default []
         */
        options: {
            type: Array as PropType<RadioGroupOption[]>,
            default: () => []
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
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useFormComponentColor(componentName, rawColor);
        const { size } = useFormComponentSize(componentName, rawSize);

        const name = toRef(props, 'name');
        const disabled = toRef(props, 'disabled');
        const readonly = toRef(props, 'readonly');
        const shouldValidate = toRef(props, 'shouldValidate');
        const errorCondition = toRef(props, 'errorCondition');
        const {
            schema,
            hasError,
            isDisabled,
            isReadonly,
            onBlur: schemaOnBlur,
            onInput: schemaOnInput
        } = useFormInputValidation({
            name,
            disabled,
            readonly,
            errorCondition,
            shouldValidate
        });

        const value = computed(() => {
            if (schema.value && shouldValidate.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': isDisabled.value,
            '-readonly': isReadonly.value,
            '-inline': props.inline,
            '-error': hasError.value
        }));

        function onChange(value: string) {
            schemaOnInput(value);
            emit('update:modelValue', value);
        }

        function onBlur(event: FocusEvent) {
            schemaOnBlur(event);
        }

        provide(RadioGroupKey, {
            name,
            value,
            disabled: isDisabled,
            readonly: isReadonly,
            color,
            size,
            onChange,
            onBlur
        });

        return {
            classes
        };
    }
});
</script>

<template>
    <div
        v-bind="$attrs"
        class="form-group radio-group"
        :class="classes"
        :name="name"
        role="radiogroup"
    >
        <Radio
            v-for="option in options"
            :key="option.id"
            :name="`${name}-${option.id}`"
            :native="native"
            :option="option"
            :label="option.label || label"
        >
            <template v-if="$slots.option">
                <slot name="option" :option="option" />
            </template>
        </Radio>
        <!-- @slot default Slot for default radio group options -->
        <slot />
    </div>
</template>
