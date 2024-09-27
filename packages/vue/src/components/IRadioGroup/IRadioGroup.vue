<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, provide, toRef } from 'vue';
import { uid } from '@inkline/utils';
import {
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation
} from '@inkline/inkline/composables';
import { FormKey, FormGroupKey, RadioGroupKey } from '@inkline/inkline/constants';
import type { RadioGroupOption } from '@inkline/inkline/components';
import { IRadio } from '@inkline/inkline/components/IRadio';

const componentName = 'IRadioGroup';

export default defineComponent({
    name: componentName,
    components: { IRadio },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the radio group
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the radio group
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The error state of the radio, computed based on schema by default.
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
         * Display the radio group as inline
         * @type Boolean
         * @default false
         * @name inline
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The indeterminate state of the radio group
         * @type Boolean
         * @default false
         * @name indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * The fallback label of the radio group. Can be a string, number, render function, or component
         * @type String | Number | Boolean | Function | Object
         * @default undefined
         * @name label
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
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default: () => {
                return uid('radio-group');
            }
        },
        /**
         * Displays the native browser radio input indicator
         * @type Boolean
         * @default false
         * @name native
         */
        native: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the radio group
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the radio group
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Enable radio group validation using schema
         * @type Boolean
         * @default true
         * @name validateSchema
         */
        validate: {
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
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = computed(
            () => props.color || formGroup?.color.value || form?.color.value
        );
        const currentSize = computed(() => props.size || formGroup?.size.value || form?.size.value);

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
        const error = toRef(props, 'error');
        const { hasError } = useFormValidationError({
            schema,
            error
        });

        const value = computed(() => {
            if (schema.value && validate.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': disabled.value,
            '-readonly': readonly.value,
            '-inline': props.inline,
            '-error': hasError.value
        }));

        function onChange(value: string) {
            schemaOnInput(name, value);
            emit('update:modelValue', value);
        }

        function onBlur(event: FocusEvent) {
            schemaOnBlur(name, event);
        }

        provide(RadioGroupKey, {
            name,
            value,
            disabled,
            readonly,
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
        <IRadio
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
        </IRadio>
        <!-- @slot default Slot for default radio group options -->
        <slot />
    </div>
</template>
