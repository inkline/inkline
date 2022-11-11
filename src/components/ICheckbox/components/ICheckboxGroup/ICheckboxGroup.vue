<script lang="ts" setup>
import { computed, provide } from 'vue';
import { useFormState , useComponentColor, useComponentSize, useValidation } from '@inkline/inkline/composables';
import { CheckboxGroupKey } from './mixin';
import { uid } from '@grozav/utils';

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

const componentColor = useComponentColor({ componentName, currentColor: props.color });
const componentSize = useComponentSize({ componentName, currentSize: props.size });
const { disabled, readonly, size } = useFormState({
    disabled: props.disabled,
    readonly: props.readonly,
    size: componentSize.value
});

const { schema, onInput: schemaOnInput, onBlur: schemaOnBlur } = useValidation({
    name: props.name
});

const classes = computed(() => ({
    [`-${componentColor.value}`]: true,
    [`-${size.value}`]: true,
    '-disabled': disabled,
    '-readonly': readonly,
    '-inline': props.inline
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
