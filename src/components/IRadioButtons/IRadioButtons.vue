<script lang="ts">
import { computed, defineComponent, inject, PropType, toRef } from 'vue';
import {
    useComponentColor,
    useComponentSize,
    useValidation,
    useFormValidationError
} from '@inkline/inkline/composables';
import { FormKey } from '@inkline/inkline/components/IForm/mixin';
import { FormGroupKey } from '@inkline/inkline/components/IFormGroup/mixin';
import { IButton } from '@inkline/inkline/components/IButton';
import { uid } from '@grozav/utils';
import {
    IRenderResolver,
    ICheckableButtonGroup,
    CheckableButtonGroupOption,
    CheckableButtonGroupVariant
} from '@inkline/inkline/components/utils';

const componentName = 'IRadioButtons';

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
         * The color variant of the radio buttons
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the radio buttons
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
         * Used to set the radio buttons value
         * @default []
         * @name modelValue
         */
        modelValue: {
            default: undefined
        },
        /**
         * The unique identifier of the radio buttons
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default() {
                return uid('radio-buttons');
            }
        },
        /**
         * The options to be rendered as radio buttons
         * @type Array
         * @default []
         * @name options
         */
        options: {
            type: Array as PropType<CheckableButtonGroupOption[]>,
            default: () => []
        },
        /**
         * The readonly state of the radio buttons
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the radio buttons
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Enable radio buttons validation using schema
         * @type Boolean
         * @default true
         * @name validate
         */
        validate: {
            type: Boolean,
            default: true
        },
        /**
         * The style variant of the radio buttons
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

        const name = toRef<string>(props, 'name');
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

        function onChange(value: string) {
            schemaOnInput(name, value);
            emit('update:modelValue', value);
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
        class="radio-buttons"
        type="radio"
        role="radiogroup"
    >
        <IButton
            v-for="option in options"
            :key="`${name}/${option.id}`"
            :disabled="option.disabled || option.readonly || readonly || disabled"
            :active="value === option.value"
            :color="color"
            :size="size"
            role="radio"
            v-bind="option.buttonProps"
            @click="onChange(option.value)"
            @blur="onBlur"
        >
            <!-- @slot default Slot for rendering radio buttons options -->
            <slot :option="option">
                <IRenderResolver :data="option.label" />
            </slot>
        </IButton>
    </ICheckableButtonGroup>
</template>
