<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { uid } from '@grozav/utils';
import { useComponentColor, useComponentSize, useValidation , useFormState } from '@inkline/inkline/composables';
import { CheckboxGroupKey } from './components/ICheckboxGroup/mixin';

const componentName = 'ICheckbox';

const props = defineProps({
    /**
     * The color variant of the checkbox
     * @type light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: undefined
    },
    /**
     * The disabled state of the checkbox
     * @type Boolean
     * @default false
     * @name disabled
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * The indeterminate state of the checkbox
     * @type Boolean
     * @default false
     * @name indeterminate
     */
    indeterminate: {
        type: Boolean,
        default: false
    },
    /**
     * Used to set the checkbox value when used inside a checkbox group
     * @default false
     * @name value
     */
    value: {
        default: undefined
    },
    /**
     * Used to set the checkbox value when used by itself
     * @default false
     * @name modelValue
     */
    modelValue: {
        default: false
    },
    /**
     * The unique identifier of the checkbox
     * @type String
     * @default uid()
     * @name name
     */
    name: {
        type: String,
        default() {
            return uid('checkbox');
        }
    },
    /**
     * Displays the native browser checkbox input indicator
     * @type Boolean
     * @default false
     * @name native
     */
    native: {
        type: Boolean,
        default: false
    },
    /**
     * The readonly state of the checkbox
     * @type Boolean
     * @default false
     * @name readonly
     */
    readonly: {
        type: Boolean,
        default: false
    },
    /**
     * The size variant of the checkbox
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
     * The tabindex of the checkbox
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

const input = ref<HTMLInputElement | null>(null);

const checkboxGroup = inject(CheckboxGroupKey, null);

const componentColor = useComponentColor({ componentName, currentColor: props.color });
const componentSize = useComponentSize({ componentName, currentSize: props.size });
const { disabled, size, readonly } = useFormState({
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
    '-disabled': disabled.value,
    '-readonly': readonly.value,
    '-native': props.native
}));

const checked = computed(() => {
    if (schema.value) {
        return schema.value.value;
    } else if (checkboxGroup?.value) {
        return checkboxGroup.value.includes(props.value);
    }

    return props.modelValue;
});

const tabindex = computed(() => {
    return disabled ? -1 : props.tabindex;
});

function onChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (checkboxGroup) {
        checkboxGroup.onChange(props.value);
    } else {
        schemaOnInput(props.name, target.checked);
    }

    emit('update:modelValue', target.checked);
}

function labelOnBlur(event: FocusEvent) {
    if (checkboxGroup) {
        checkboxGroup.onBlur(event);
    } else {
        schemaOnBlur(props.name, event);
    }
}

function labelOnClick(event: MouseEvent) {
    if (readonly.value) {
        return;
    }

    input.value?.click();
    labelOnBlur(event);
}
</script>

<template>
    <div
        class="checkbox"
        :class="classes"
        :aria-checked="checked ? 'true' : 'false'"
        role="checkbox"
    >
        <input
            ref="input"
            type="checkbox"
            :checked="checked"
            :tabindex="tabindex"
            :name="name"
            :disabled="disabled"
            :readonly="readonly"
            :indeterminate.prop="indeterminate"
            aria-hidden="true"
            :aria-checked="checked"
            :aria-readonly="readonly"
            @change="onChange"
            @blur="labelOnBlur"
        />
        <label
            class="checkbox-label"
            :aria-disabled="disabled ? 'true' : null"
            @blur="labelOnBlur"
            @click="labelOnClick"
            @keydown.space.stop.prevent="labelOnClick"
        >
            <!--** Slot for default checkbox label -->
            <slot />
        </label>
    </div>
</template>
