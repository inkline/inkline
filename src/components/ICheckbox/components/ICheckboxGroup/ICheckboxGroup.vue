<script lang="ts" setup>
import {computed, inject, PropType, provide} from 'vue';
import {
    useFormState,
    useComponentColor,
    useComponentSize,
    useValidation,
    useFormSchemaError
} from '@inkline/inkline/composables';
import { CheckboxGroupKey } from './mixin';
import { uid } from '@grozav/utils';
import {FormKey} from "@inkline/inkline/components/IForm";
import {FormGroupKey} from "@inkline/inkline/components/IForm/components/IFormGroup/mixin";

const componentName = 'ICheckboxGroup';

const props = defineProps({
    /**
     * The color variant of the checkbox group
     * @type light | dark
     * @default light
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
        default: undefined
    },
    /**
     * The unique identifier of the checkbox group
     * @type String
     * @default uid()
     * @name name
     */
    name: {
        type: String,
        default() {
            return uid('checkbox-group');
        }
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
const { hasError } = useFormSchemaError({
    schema,
    error: props.error
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
    let modelValue: any[] = [];

    console.log(schema);

    if (schema.value) {
        modelValue = [...schema.value.value];
    } else if (props.modelValue) {
        modelValue = [...props.modelValue];
    }

    const valueIndex = modelValue.findIndex((v) => v === value);

    if (valueIndex !== -1) {
        modelValue.splice(valueIndex, 1);
    } else {
        modelValue.push(value);
    }

    schemaOnInput(props.name, modelValue);
    emit('update:modelValue', modelValue);
}

function onBlur(event: FocusEvent) {
    schemaOnBlur(props.name, event);
}

provide(CheckboxGroupKey, {
    name: props.name,
    value: schema.value?.value || props.modelValue,
    disabled,
    readonly,
    color,
    size,
    onChange,
    onBlur
});
</script>

<template>
    <div class="form-group checkbox-group" :class="classes" :name="name" role="checkboxgroup">
        <!--** Slot for default checkbox group options -->
        <slot />
    </div>
</template>
