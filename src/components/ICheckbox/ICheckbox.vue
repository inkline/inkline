<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { uid } from '@grozav/utils';
import { useComponentColor, useComponentSize, useValidation } from '@inkline/inkline/composables';
import { useInputState } from '@inkline/inkline/composables/inputState';
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

const checkboxGroup = inject(CheckboxGroupKey, {});

const componentColor = useComponentColor({ componentName, currentColor: props.color });
const componentSize = useComponentSize({ componentName, currentSize: props.size });
const { disabled, size, readonly } = useInputState({
    disabled: props.disabled,
    readonly: props.readonly,
    size: componentSize.value
});
const { schema, onInput, onBlur } = useValidation({
    name: props.name,
    elementType: 'checkbox'
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
    } else if (checkboxGroup?.values) {
        return checkboxGroup.values.includes(props.value);
    }
    return props.modelValue;
});

const tabindex = computed(() => {
    return disabled ? -1 : props.tabindex;
});

function onClickLabel() {
    if (readonly.value) {
        return;
    }
    input.value?.click();
}

function changed(event: Event) {
    const target = event.target as HTMLInputElement;

    if (checkboxGroup.onChange) {
        checkboxGroup.onChange(props.value);
    } else {
        onInput(props.name, target.checked);
    }
    emit('update:modelValue', target.checked);
}

function blurred(event: FocusEvent) {
    if (checkboxGroup.onBlur) {
        checkboxGroup.onBlur(props.name, event);
    } else {
        onBlur(props.name, event);
    }
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
            @change="changed"
        />
        <label
            class="checkbox-label"
            :aria-disabled="disabled"
            @blur="blurred"
            @click="onClickLabel"
            @keydown.space.stop.prevent="onClickLabel"
        >
            <!--** Slot for default checkbox label -->
            <slot />
        </label>
    </div>
</template>
