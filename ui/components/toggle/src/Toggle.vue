<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref, toRef } from 'vue';
import { uid } from '@inkline/utils';
import { FormStateKeys } from '@inkline/types';
import {
    useFormInputValidation,
    useFormComponentColor,
    useFormComponentSize
} from '@inkline/composables';

const componentName = 'Toggle';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the toggle
         * @param {'light' | 'dark'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the toggle
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The error state of the input, computed based on schema by default.
         * @param {boolean | Array} name
         * @default ['touched', 'dirty', 'invalid']
         */
        errorCondition: {
            type: [Boolean, Array] as PropType<boolean | FormStateKeys[]>,
            // @TODO use propDefaultValue to set default value
            default: undefined
        },
        /**
         * The indeterminate state of the toggle
         * @param {boolean} indeterminate
         * @default false
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * Used to set the toggle value when used inside a toggle group
         * @default false
         * @name value
         */
        value: {
            type: Boolean,
            default: undefined
        },
        /**
         * Used to set the toggle value when used by itself
         * @default false
         * @param {boolean} modelValue
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * The unique identifier of the toggle
         * @param {string} name
         * @default uid()
         */
        name: {
            type: String,
            default: () => {
                return uid('toggle');
            }
        },
        /**
         * Displays the native browser toggle input indicator
         * @param {boolean} native
         * @default false
         */
        native: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the toggle
         * @param {boolean} readonly
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The rounded variant of the toggle
         * @param {boolean} rounded
         * @default false
         */
        rounded: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the toggle
         * @param {'sm' | 'md' | 'lg'} size
         * @default
         *
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The tabindex of the toggle
         * @param {number | number} tabindex
         * @default 0
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * Enable input validation using schema
         * @param {boolean} validateSchema
         * @default true
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

        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useFormComponentColor(componentName, rawColor);
        const { size } = useFormComponentSize(componentName, rawSize);

        const name = toRef(props, 'name');
        const disabled = toRef(props, 'disabled');
        const readonly = toRef(props, 'readonly');
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
            '-rounded': props.rounded,
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
