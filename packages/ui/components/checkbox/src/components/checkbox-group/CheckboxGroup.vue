<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, provide, toRef } from 'vue';
import {
    useFormComponentColor,
    useFormComponentSize,
    useFormInputValidation
} from '@inkline/composables';
import { CheckboxGroupKey } from '@inkline/types';
import type { FormStateKeys } from '@inkline/types';
import { uid } from '@inkline/utils';
import type { CheckboxGroupOption } from '@inkline/types';
import { Checkbox } from '../checkbox';

const componentName = 'CheckboxGroup';

export default defineComponent({
    name: componentName,
    components: { Checkbox },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the checkbox group
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the checkbox group
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The error state of the input, computed based on schema by default.
         * @type Boolean | Array
         * @default ['touched', 'dirty', 'invalid']
         * @TODO use propDefaultValue to set default value
         * @name error
         */
        errorCondition: {
            type: [Boolean, Array] as PropType<boolean | FormStateKeys[]>,
            default: undefined
        },
        /**
         * Display the checkbox group as inline
         * @type Boolean
         * @default false
         * @name inline
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The indeterminate state of the checkbox group
         * @type Boolean
         * @default false
         * @name indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * Used to set the checkbox group value
         * @default []
         * @name modelValue
         */
        modelValue: {
            type: Array,
            default: () => []
        },
        /**
         * The unique identifier of the checkbox group
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default: () => {
                return uid('checkbox-group');
            }
        },
        /**
         * Displays the native browser checkbox input indicator
         * @type Boolean
         * @default false
         * @name native
         */
        native: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the checkbox group
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the checkbox group
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Enable checkbox group validation using schema
         * @type Boolean
         * @default true
         * @name validateSchema
         */
        shouldValidate: {
            type: Boolean,
            default: true
        },
        /**
         * The options of the checkbox group
         * @type Array
         * @default []
         * @name options
         */
        options: {
            type: Array as PropType<CheckboxGroupOption[]>,
            default: () => []
        },
        /**
         * The fallback label of the checkbox group. Can be a string, number, render function, or component
         * @type String | Number | Boolean | Function | Object
         * @default undefined
         * @name label
         */
        label: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                CheckboxGroupOption['label']
            >,
            default: undefined
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

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': isDisabled.value,
            '-readonly': isReadonly.value,
            '-inline': props.inline,
            '-error': hasError.value
        }));

        const value = computed(() => {
            if (schema.value && shouldValidate.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        function onChange(value: string) {
            let modelValue: any[] = [];

            if (schema.value) {
                modelValue = schema.value.value ? [...schema.value.value] : [];
            } else if (props.modelValue) {
                modelValue = [...props.modelValue];
            }

            const valueIndex = modelValue.findIndex((v) => v === value);

            if (valueIndex !== -1) {
                modelValue.splice(valueIndex, 1);
            } else {
                modelValue.push(value);
            }

            schemaOnInput(modelValue);
            emit('update:modelValue', modelValue);
        }

        function onBlur(event: FocusEvent) {
            schemaOnBlur(event);
        }

        provide(CheckboxGroupKey, {
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
        class="form-group checkbox-group"
        :class="classes"
        :name="name"
        role="checkboxgroup"
    >
        <Checkbox
            v-for="option in options"
            :key="option.id"
            :name="`${name}-${option.id}`"
            :option="option"
            :native="native"
            :indeterminate="option.indeterminate"
            :label="option.label || label"
        >
            <template v-if="$slots.option">
                <slot name="option" :option="option" />
            </template>
        </Checkbox>
        <!-- @slot default Slot for default checkbox group options -->
        <slot />
    </div>
</template>
