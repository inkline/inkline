<script lang="ts" setup>
import {computed, inject, provide} from 'vue';
import {useComponentColor, useComponentSize, useFormValidationError, useValidation} from '@inkline/inkline/composables';
import {FormKey} from "../IForm";
import {FormGroupKey} from "./mixin";

const componentName = 'IFormGroup';

const props = defineProps({
    /**
     * The color variant of the form group
     * @type light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * The disabled state of the form group
     * @type Boolean
     * @default false
     * @name disabled
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * Display the form group as inline
     * @type Boolean
     * @default false
     * @name inline
     */
    inline: {
        type: Boolean,
        default: false
    },
    /**
     * The identifier of the form group
     * @type String
     * @default
     * @name name
     */
    name: {
        type: String,
        default: ''
    },
    /**
     * The readonly state of the form group
     * @type Boolean
     * @default false
     * @name readonly
     */
    readonly: {
        type: Boolean,
        default: false
    },
    /**
     * The required state of the form group
     * @type Boolean
     * @default false
     * @name required
     */
    required: {
        type: Boolean,
        default: false
    },
    /**
     * The size variant of the form group
     * @type sm | md | lg
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: 'md'
    }
});

const form = inject(FormKey, null);
const formGroup = inject(FormGroupKey, null);

const { schema, onBlur, onInput } = useValidation({ name: props.name });
const { hasError } = useFormValidationError({
    schema,
    error: ['invalid']
});

const color = useComponentColor({ componentName, currentColor: props.color || formGroup?.color.value || form?.color.value });
const size = useComponentSize({ componentName, currentSize: props.size || formGroup?.size.value || form?.size.value });

const disabled = computed(() => !!(props.disabled || formGroup?.disabled.value || form?.disabled.value));
const readonly = computed(() => !!(props.disabled || formGroup?.readonly.value || form?.readonly.value));

const classes = computed(() => ({
    [`-${size.value}`]: true,
    [`-${color.value}`]: true,
    '-disabled': disabled.value,
    '-readonly': readonly.value,
    '-inline': props.inline,
    '-error': hasError.value,
    '-required': props.required // @TODO Add required state based on required validator this.input.schema?.validators.some(v => v.name === 'required')
}));

provide(FormGroupKey, {
    disabled,
    readonly,
    size,
    color,
    onBlur,
    onInput,
});
</script>

<template>
    <fieldset class="form-group" :class="classes" :name="name" role="group">
        <!--** Slot for default form group content -->
        <slot />
    </fieldset>
</template>
