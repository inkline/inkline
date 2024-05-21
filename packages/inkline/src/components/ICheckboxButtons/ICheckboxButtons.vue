<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, toRef } from 'vue';
import {
    useComponentColor,
    useComponentSize,
    useValidation,
    useFormValidationError
} from '@inkline/inkline/composables';
import { FormKey, FormGroupKey } from '@inkline/inkline/constants';
import { IButton } from '@inkline/inkline/components/IButton';
import { uid } from '@grozav/utils';
import type { CheckableButtonGroupVariant } from '@inkline/inkline/components/utils';
import { IRenderResolver, ICheckableButtonGroup } from '@inkline/inkline/components/utils';
import type { CheckboxButtonOption } from '@inkline/inkline/components/ICheckboxButtons/types';

const componentName = 'ICheckboxButtons';

export default defineComponent({
    name: componentName,
    components: {
        IRenderResolver,
        IButton,
        ICheckableButtonGroup
    },
    inheritAttrs: false,
    props: {
        /**
         * The default button props of the checkbox buttons
         * @type Object
         * @default {}
         * @name buttonProps
         */
        buttonProps: {
            type: Object as PropType<CheckboxButtonOption['buttonProps']>,
            default: () => ({})
        },
        /**
         * The fallback label of the checkbox buttons. Can be a string, number, render function, or component
         * @type String | Number | Boolean | Function | Object
         * @default undefined
         * @name label
         */
        label: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                CheckboxButtonOption['label']
            >,
            default: undefined
        },
        /**
         * The color variant of the checkbox buttons
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the checkbox buttons
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The error state of the checkbox, computed based on schema by default.
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
         * Used to set the checkbox buttons value
         * @default []
         * @name modelValue
         */
        modelValue: {
            type: Array as PropType<Array<CheckboxButtonOption['id']>>,
            default: () => []
        },
        /**
         * The unique identifier of the checkbox buttons
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default: () => {
                return uid('checkbox-buttons');
            }
        },

        /**
         * The options to be rendered as checkbox buttons
         * @type Array
         * @default []
         * @name options
         */
        options: {
            type: Array as PropType<CheckboxButtonOption[]>,
            default: () => []
        },
        /**
         * The readonly state of the checkbox buttons
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the checkbox buttons
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Enable checkbox buttons validation using schema
         * @type Boolean
         * @default true
         * @name validateSchema
         */
        validate: {
            type: Boolean,
            default: true
        },
        /**
         * The style variant of the checkbox buttons
         * @type default | button-group
         * @default default
         * @name variant
         */
        variant: {
            type: String as PropType<CheckableButtonGroupVariant>,
            default: 'default'
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
        const error = toRef(props, 'error');
        const { hasError } = useFormValidationError({
            schema,
            error
        });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': disabled.value,
            '-readonly': readonly.value,
            '-error': hasError.value
        }));

        const value = computed(() => {
            if (schema.value && validate.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        function onChange(value: CheckboxButtonOption['id']) {
            let modelValue: Array<CheckboxButtonOption['id']> = [];

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

            schemaOnInput(name, modelValue);
            emit('update:modelValue', modelValue);
        }

        function onBlur(event: FocusEvent) {
            schemaOnBlur(name, event);
        }

        return {
            classes,
            value,
            onChange,
            onBlur
        };
    }
});
</script>

<template>
    <ICheckableButtonGroup
        v-bind="$attrs"
        :class="classes"
        :name="name"
        :variant="variant"
        class="checkbox-buttons"
        type="checkbox"
        role="checkboxgroup"
    >
        <!-- @slot prepend Slot for rendering additional content before buttons -->
        <slot name="prepend" />
        <IButton
            v-for="option in options"
            :key="`${name}/${option.id}`"
            :disabled="option.disabled || option.readonly || readonly || disabled"
            :active="value?.includes(option.id)"
            :color="color"
            :size="size"
            role="checkbox"
            v-bind="{ ...buttonProps, ...option.buttonProps }"
            @click="onChange(option.id)"
            @blur="onBlur"
        >
            <!-- @slot option Slot for rendering checkbox buttons options content -->
            <slot name="option" :option="option">
                <IRenderResolver :render="option.label ?? label" :ctx="option" />
            </slot>
        </IButton>
        <!-- @slot append Slot for rendering additional content after buttons -->
        <slot name="append" />
    </ICheckableButtonGroup>
</template>
