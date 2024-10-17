<script lang="ts">
import { computed, defineComponent, inject, PropType, toRef, watch } from 'vue';
import { Button } from '@inkline/component-button';
import { uid } from '@inkline/utils';
import type { InputElementEvent } from '@inkline/inkline/types';
import { useComponentColor, useComponentSize, useValidation } from '@inkline/inkline/composables';
import { FormKey, FormGroupKey } from '@inkline/inkline/constants';
import { Input } from '@inkline/inkline/components';

const componentName = 'NumberInput';

export default defineComponent({
    name: componentName,
    components: {
        Button,
        Input
    },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the input
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * Display the input as clearable
         * @type Boolean
         * @default false
         * @name clearable
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the input
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
        error: {
            type: [Array, Boolean] as PropType<boolean | string[]>,
            default: () => ['touched', 'dirty', 'invalid']
        },
        /**
         * The id of the internal input element
         * @type String
         * @default
         * @name id
         */
        id: {
            type: String,
            default: undefined
        },
        /**
         * The id of the input wrapper element
         * @type String
         * @default
         * @name wrapperId
         */
        wrapperId: {
            type: String,
            default: undefined
        },
        /**
         * Display the input as plaintext, disabling interaction
         * @type Boolean
         * @default false
         * @name plaintext
         */
        plaintext: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the input
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the input
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The tabindex of the input
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * The type of the input
         * @type String
         * @default text
         * @name type
         */
        type: {
            type: String,
            default: 'text'
        },
        /**
         * The aria-label of the clear button
         * @type String
         * @default Clear
         * @name clearAriaLabel
         */
        clearAriaLabel: {
            type: String,
            default: 'Clear'
        },
        /**
         * The aria-label of the show password toggle button
         * @type String
         * @default Toggle password visibility
         * @name showPasswordToggleAriaLabel
         */
        showPasswordToggleAriaLabel: {
            type: String,
            default: 'Toggle password visibility'
        },
        /**
         * Display the password toggle button
         * @type Boolean
         * @default true
         * @name showPasswordToggle
         */
        showPasswordToggle: {
            type: Boolean,
            default: true
        },
        /**
         * Enable input validation using schema
         * @type Boolean
         * @default true
         * @name validateSchema
         */
        validate: {
            type: Boolean,
            default: true
        },
        /**
         * Used to set the field value
         * @type String | Number
         * @default
         * @name modelValue
         */
        modelValue: {
            type: [String, Number],
            default: ''
        },
        /**
         * The unique identifier of the input
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default: () => {
                return uid('number-input');
            }
        },
        /**
         * The minimum allowed input value
         * @type Number
         * @default -Infinity
         * @name min
         */
        min: {
            type: [Number, String],
            default: -Infinity
        },
        /**
         * The maximum allowed input value
         * @type Number
         * @default +Infinity
         * @name max
         */
        max: {
            type: [Number, String],
            default: Infinity
        },
        /**
         * The precision of the input value, for floating point numbers
         * @type Number
         * @default 0
         * @name precision
         */
        precision: {
            type: Number,
            default: 0
        },
        /**
         * The increment step to increase or decrease the value by
         * @type Number
         * @default 1
         * @name step
         */
        step: {
            type: Number,
            default: 1
        }
    },
    emits: Input.emits,
    setup(props, { emit }) {
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = toRef(props, 'color');
        const currentSize = toRef(props, 'size');
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const disabled = computed(
            () => !!(props.disabled || formGroup?.disabled.value || form?.disabled.value)
        );
        const readonly = computed(
            () => !!(props.readonly || formGroup?.readonly.value || form?.readonly.value)
        );

        const name = toRef(props, 'name');
        const validate = toRef(props, 'validate');
        const {
            schema,
            onInput: schemaOnInput,
            onBlur: schemaOnBlur
        } = useValidation({
            name,
            validate
        });

        const value = computed(() => {
            if (schema.value && validate.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        watch(
            () => value.value,
            (value) => {
                let newValue = (value || '')
                    .toString()
                    .replace(/^[^0-9-]/, '')
                    .replace(/^(-)[^0-9]/, '$1')
                    .replace(
                        new RegExp(`^(-?[0-9]+)[^0-9${props.precision > 0 ? '.' : ''}]`),
                        '$1'
                    );

                if (props.precision > 0) {
                    newValue = newValue
                        .replace(/^(-?[0-9]+\.)[^0-9]/, '$1')
                        .replace(new RegExp(`^(-?[0-9]+\\.[0-9]{0,${props.precision}}).*`), '$1');
                }

                if (parseFloat(newValue) >= parseFloat(props.max as string))
                    newValue = props.max.toString();
                if (parseFloat(newValue) <= parseFloat(props.min as string))
                    newValue = props.min.toString();

                schemaOnInput(name, newValue);
                emit('update:modelValue', newValue);
            }
        );

        function onBlur(event: Event) {
            schemaOnBlur(name, event);
        }

        function onUpdateModelValue(value: string) {
            schemaOnInput(name, value);
            emit('update:modelValue', value);
        }

        function decrease() {
            if (disabled.value || readonly.value) {
                return;
            }

            onUpdateModelValue(formatPrecision((Number(value.value) - props.step).toString()));
        }

        function increase() {
            if (disabled.value || readonly.value) {
                return;
            }

            onUpdateModelValue(formatPrecision((Number(value.value) + props.step).toString()));
        }

        function formatPrecision(value: string) {
            const parts = value.split('.');
            let decimals = parts[1] || '';

            for (let i = decimals.length; i < props.precision; i += 1) {
                decimals += '0';
            }

            return props.precision > 0 ? `${parts[0]}.${decimals}` : parts[0];
        }

        function onBlurFormatPrecision(event: InputElementEvent) {
            if (disabled.value || readonly.value) {
                return;
            }

            onUpdateModelValue(formatPrecision(Number(value.value).toString()));
            onBlur(event);
        }

        return {
            color,
            size,
            disabled,
            value,
            onBlur,
            onUpdateModelValue,
            decrease,
            increase,
            onBlurFormatPrecision
        };
    }
});
</script>

<template>
    <Input
        v-bind="{ ...$attrs, ...$props }"
        :model-value="value"
        type="text"
        @update:model-value="onUpdateModelValue"
    >
        <template #prepend>
            <Button
                type="button"
                :color="color"
                :size="size"
                :disabled="disabled"
                class="input-button-decrease"
                @click="decrease"
            >
                -
            </Button>
            <slot name="prepend" />
        </template>
        <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
        </template>
        <template v-if="$slots.clearable" #clearable>
            <slot name="clearable" />
        </template>
        <template v-if="$slots.suffix" #suffix>
            <slot name="suffix" />
        </template>
        <template #append>
            <Button
                type="button"
                :color="color"
                :size="size"
                :disabled="disabled"
                class="input-button-increase"
                @click="increase"
            >
                +
            </Button>
            <slot name="append" />
        </template>
    </Input>
</template>
