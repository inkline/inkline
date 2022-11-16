<script lang="ts" setup>
import {computed, defineComponent, inject, PropType, ref} from 'vue';
import { uid } from '@grozav/utils';
import { computedColorValue, FormComponentMixin, computedSizeValue } from '@inkline/inkline/mixins';
import { Classes, InputElementEvent } from '@inkline/inkline/types';
import {RadioGroupKey} from "@inkline/inkline/components/IRadioGroup";
import {FormKey} from "@inkline/inkline/components/IForm";
import {FormGroupKey} from "@inkline/inkline/components/IFormGroup";
import {useComponentColor, useComponentSize, useFormValidationError, useValidation} from "@inkline/inkline/composables";

const componentName = 'IRadio';

const props = defineProps({
    /**
     * The color variant of the radio
     * @type light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: undefined
    },
    /**
     * The disabled state of the radio
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
     * Used to set the radio value when used inside a radio group
     * @default false
     * @name value
     */
    value: {
        default: undefined
    },
    /**
     * Used to set the radio value when used by itself
     * @default false
     * @name modelValue
     */
    modelValue: {
        default: false
    },
    /**
     * The unique identifier of the radio
     * @type String
     * @default uid()
     * @name name
     */
    name: {
        type: String,
        default() {
            return uid('radio');
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
     * The readonly state of the radio
     * @type Boolean
     * @default false
     * @name readonly
     */
    readonly: {
        type: Boolean,
        default: false
    },
    /**
     * The size variant of the radio
     * @type sm | md | lg
     * @default md
     * @name size
     *
     */
    size: {
        type: String,
        default: undefined
    },
    /**
     * The tabindex of the radio
     * @type Number | String
     * @default 0
     * @name tabindex
     */
    tabindex: {
        type: [Number, String],
        default: 0
    }
});

const emit = defineEmits([
    /**
     * Event emitted for setting the modelValue
     * @event update:modelValue
     */
    'update:modelValue'
]);

const inputRef = ref<HTMLInputElement | null>(null);

const radioGroup = inject(RadioGroupKey, null);
const form = inject(FormKey);
const formGroup = inject(FormGroupKey);

const currentColor = computed(() => props.color || radioGroup?.color.value || formGroup?.color.value || form?.color.value);
const currentSize = computed(() => props.size || radioGroup?.size.value || formGroup?.size.value || form?.size.value);
const { color } = useComponentColor({ componentName, currentColor });
const { size } = useComponentSize({ componentName, currentSize });

const disabled = computed(() => props.disabled || radioGroup?.disabled.value || formGroup?.disabled.value || form?.disabled.value);
const readonly = computed(() => props.disabled || radioGroup?.readonly.value || formGroup?.readonly.value || form?.readonly.value);

const { schema, onInput: schemaOnInput, onBlur: schemaOnBlur } = useValidation({
    name: props.name
});
const { hasError } = useFormValidationError({
    schema,
    error: props.error
});

const classes = computed(() => ({
    [`-${color.value}`]: true,
    [`-${size.value}`]: true,
    '-disabled': disabled.value,
    '-readonly': readonly.value,
    '-native': props.native,
    '-error': hasError.value,
}));

const checked = computed(() => {
    if (radioGroup?.value) {
        return radioGroup.value.value === props.value;
    }

    return props.modelValue;
});

const tabindex = computed(() => {
    return disabled.value ? -1 : props.tabindex;
});

function onChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (radioGroup) {
        radioGroup.onChange(props.value);
    } else {
        schemaOnInput(props.name, target.checked);
    }

    emit('update:modelValue', target.checked);
}

function labelOnBlur(event: FocusEvent) {
    if (radioGroup) {
        radioGroup.onBlur(event);
    } else {
        schemaOnBlur(props.name, event);
    }
}

function labelOnClick(event: MouseEvent) {
    if (readonly.value) {
        return;
    }

    inputRef.value?.click();
    labelOnBlur(event);
}
</script>

<template>
    <div
        class="radio"
        :class="classes"
        role="radio"
        :aria-checked="checked ? 'true' : 'false'"
        :aria-disabled="disabled ? 'true' : null"
        :aria-readonly="readonly ? 'true' : null"
    >
        <input
            ref="inputRef"
            :checked="checked"
            :tabindex="tabindex"
            type="radio"
            :name="name"
            :disabled="disabled"
            :readonly="readonly"
            @change="onChange"
            @blur="labelOnBlur"
        />
        <label
            class="radio-label"
            @blur="labelOnBlur"
            @click="labelOnClick"
            @keydown.space.stop.prevent="labelOnClick"
        >
            <!-- @slot default Slot for default radio label -->
            <slot />
        </label>
    </div>
</template>
