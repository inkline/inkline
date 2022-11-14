<script lang="ts" setup>
import {computed, defineComponent, inject, PropType, provide} from 'vue';
import {
    computedColorValue,
    sizePropValidator,
    FormComponentMixin,
    computedPropValue
} from '@inkline/inkline/mixins';
import { uid } from '@grozav/utils';
import { Classes } from '@inkline/inkline/types';
import {FormKey} from "@inkline/inkline/components/IForm";
import {FormGroupKey} from "@inkline/inkline/components/IFormGroup";
import {useComponentColor, useComponentSize, useFormValidationError, useValidation} from "@inkline/inkline/composables";
import {RadioGroupKey} from "@inkline/inkline/components/IRadioGroup";

const componentName = 'IRadioGroup';

const props = defineProps({
    /**
     * The color variant of the radio group
     * @type light | dark
     * @default light
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
     * Used to set the radio group value
     * @default []
     * @name modelValue
     */
    modelValue: {
        type: Array,
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
        default() {
            return uid('radio-group');
        }
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
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: undefined
    }
});

const emit = defineEmits([
    /**
     * Event emitted for setting the modelValue
     * @event update:modelValue
     */
    'update:modelValue'
]);

const form = inject(FormKey);
const formGroup = inject(FormGroupKey);

const color = useComponentColor({ componentName, currentColor: props.color });
const size = useComponentSize({ componentName, currentSize: props.size });

const disabled = computed(() => !!(props.disabled || formGroup?.disabled.value || form?.disabled.value));
const readonly = computed(() => !!(props.disabled || formGroup?.readonly.value || form?.readonly.value));

const { schema, onInput: schemaOnInput, onBlur: schemaOnBlur } = useValidation({
    name: props.name
});
const { hasError } = useFormValidationError({
    schema,
    error: props.error
});

const value = computed(() => {
    if (schema.value) {
        return schema.value.value;
    }

    return props.modelValue;
});

const classes = computed(() => ({
    [`-${color.value}`]: true,
    [`-${size.value}`]: true,
    '-disabled': disabled,
    '-readonly': readonly,
    '-inline': props.inline,
    '-error': hasError.value
}));

function onChange(value: string) {
    schemaOnInput(props.name, value);
    emit('update:modelValue', value);
}

function onBlur(event: FocusEvent) {
    schemaOnBlur(props.name, event);
}

provide(RadioGroupKey, {
    name: props.name,
    value,
    disabled,
    readonly,
    color,
    size,
    onChange,
    onBlur
});
</script>

<template>
    <div class="form-group radio-group" :class="classes" :name="name" role="radiogroup">
        <!--** Slot for default radio group options -->
        <slot />
    </div>
</template>
