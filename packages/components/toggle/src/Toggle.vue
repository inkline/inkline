<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref, toRef } from 'vue';
import { uid } from '@inkline/utils';
import { FormKey, FormGroupKey, FormStateKeys } from '@inkline/types';
import {
    useFormInputValidation,
    useFormComponentColor,
    useFormComponentSize
} from '@inkline/composables';

const componentName = 'Toggle';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the checkbox
         * @type light | dark
         * @default
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
         * The error state of the input, computed based on schema by default.
         * @type Boolean | Array
         * @default ['touched', 'dirty', 'invalid']
         * @TODO use propDefaultValue to set default value
         * @name error
         */
        errorCondition: {
            type: [Boolean, Array] as PropType<boolean | FormStateKeys[]>,
            default: undefined
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
            type: Boolean,
            default: undefined
        },
        /**
         * Used to set the checkbox value when used by itself
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
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
            default: () => {
                return uid('toggle');
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
         * @default
         * @name sizeMultiplier
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
        },
        /**
         * Enable input validation using schema
         * @type Boolean
         * @default true
         * @name validateSchema
         */
        shouldValidate: {
            type: Boolean,
            default: true
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
        const inputRef = ref<HTMLInputElement | null>(null);

        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const rawColor = computed(() => props.color || checkboxGroup?.color.value);
        const rawSize = computed(() => props.size || checkboxGroup?.size.value);
        const { color } = useFormComponentColor(componentName, rawColor);
        const { size } = useFormComponentSize(componentName, rawSize);

        const name = toRef(props, 'name');
        const disabled = computed(() => Boolean(props.disabled || checkboxGroup?.disabled.value));
        const readonly = computed(() => Boolean(props.readonly || checkboxGroup?.readonly.value));
        const shouldValidate = toRef(props, 'shouldValidate');
        const errorCondition = toRef(props, 'errorCondition');
        const {
            schema,
            hasError,
            isDisabled,
            isReadonly,
            onBlur: schemaOnBlur,
            onInput: schemaOnInput
        } = useFormInputValidation({
            name,
            disabled,
            readonly,
            errorCondition,
            shouldValidate
        });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': isDisabled.value,
            '-readonly': isReadonly.value,
            '-native': props.native,
            '-error': hasError.value
        }));

        const checked = computed(() => {
            if (schema.value) {
                return Boolean(schema.value.value);
            }

            return props.modelValue;
        });

        const tabIndex = computed(() => {
            return isDisabled.value ? -1 : props.tabindex;
        });

        function onChange(event: Event) {
            const target = event.target as HTMLInputElement;

            schemaOnInput(target.checked);
            emit('update:modelValue', target.checked);
        }

        function labelOnBlur(event: FocusEvent) {
            schemaOnBlur(event);
        }

        function labelOnClick(event: MouseEvent) {
            if (isReadonly.value) {
                return;
            }

            inputRef.value?.click();
            labelOnBlur(event);
        }

        function labelOnKeydown(event: KeyboardEvent) {
            labelOnClick(event as unknown as MouseEvent);
        }

        return {
            inputRef,
            classes,
            checked,
            isDisabled,
            isReadonly,
            tabIndex,
            onChange,
            labelOnBlur,
            labelOnClick,
            labelOnKeydown
        };
    }
});
</script>

<template>
    <div
        v-bind="$attrs"
        class="toggle"
        :class="classes"
        :aria-checked="checked"
        :aria-disabled="isDisabled"
        :aria-readonly="isReadonly"
        role="checkbox"
    >
        <input
            ref="inputRef"
            type="checkbox"
            :checked="checked"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :aria-checked="checked"
            :aria-disabled="isDisabled"
            :aria-readonly="isReadonly"
            :name="name"
            @change="onChange"
        />
        <label
            class="toggle-label"
            :tabindex="tabIndex"
            @click="labelOnClick"
            @blur="labelOnBlur"
            @keydown.space.stop.prevent="labelOnKeydown"
        >
            <!-- @slot default Slot for default toggle label -->
            <slot />
        </label>
    </div>
</template>
