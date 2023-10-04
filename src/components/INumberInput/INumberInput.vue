<script lang="ts">
import { computed, defineComponent, inject, toRef, watch } from 'vue';
import { IButton } from '@inkline/inkline/components/IButton';
import { uid } from '@grozav/utils';
import { InputElementEvent } from '@inkline/inkline/types';
import { useComponentColor, useComponentSize, useValidation } from '@inkline/inkline/composables';
import { FormKey, FormGroupKey } from '@inkline/inkline/constants';
import { IInput } from '@inkline/inkline/components';

const componentName = 'INumberInput';

export default defineComponent({
    name: componentName,
    components: {
        IButton,
        IInput
    },
    inheritAttrs: false,
    props: {
        ...IInput.props,
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
    emits: IInput.emits,
    setup(props, { emit }) {
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = toRef(props, 'color');
        const currentSize = toRef(props, 'size');
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

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
    <IInput
        v-bind="{ ...$attrs, ...$props }"
        :modelValue="value"
        type="text"
        @update:modelValue="onUpdateModelValue"
    >
        <template #prepend>
            <IButton
                type="button"
                :color="color"
                :size="size"
                :disabled="disabled"
                class="input-button-decrease"
                @click="decrease"
            >
                -
            </IButton>
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
            <IButton
                type="button"
                :color="color"
                :size="size"
                :disabled="disabled"
                class="input-button-increase"
                @click="increase"
            >
                +
            </IButton>
            <slot name="append" />
        </template>
    </IInput>
</template>
