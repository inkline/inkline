<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref, toRef } from 'vue';
import { uid } from '@inkline/utils';
import { RadioGroupKey, FormStateKeys } from '@inkline/types';
import {
    useFormComponentColor,
    useFormComponentSize,
    useFormInputValidation
} from '@inkline/composables';
import type { RadioGroupOption } from '@inkline/types';
import { DynamicRenderer } from '@inkline/component-dynamic-renderer';

const componentName = 'Radio';

export default defineComponent({
    name: componentName,
    components: { DynamicRenderer },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the radio
         * @param {'light' | 'dark'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the radio
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The error state of the input, computed based on schema by default.
         * @param {boolean | FormStateKeys[]} error
         * @default ['touched', 'dirty', 'invalid']
         */
        errorCondition: {
            type: [Boolean, Array] as PropType<boolean | FormStateKeys[]>,
            // @TODO use propDefaultValue to set default value
            default: undefined
        },
        /**
         * [Deprecated] Used to set the radio value when used inside a radio group
         * @default false
         * @name value
         * @deprecated
         */
        value: {
            type: [String, Number, Boolean] as PropType<string | number | boolean>,
            default: undefined
        },
        /**
         * Used to set the radio value when used by itself
         * @param {string | number | boolean | object} modelValue
         * @default false
         */
        modelValue: {
            type: [String, Number, Boolean, Object] as PropType<string | number | boolean | object>,
            default: false
        },
        /**
         * The unique identifier of the radio
         * @param {string} name
         * @default uid()
         */
        name: {
            type: String,
            default: () => {
                return uid('radio');
            }
        },
        /**
         * Displays the native browser radio input indicator
         * @param {boolean} native
         * @default false
         */
        native: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the radio
         * @param {boolean} readonly
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the radio
         * @param {'sm' | 'md' | 'lg'} sizeMultiplier
         * @default
         *
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The tabindex of the radio
         * @param {number | number} tabindex
         * @default 0
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * The label to be displayed alongside the radio. Can be a string, number, render function, or component
         * @param {string | number | boolean | Function | Object} label
         * @default undefined
         */
        label: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                RadioGroupOption['label']
            >,
            default: undefined
        },
        /**
         * The option object of the radio when used inside a radio group
         * @param {Object} option
         * @default undefined
         */
        option: {
            type: Object as PropType<RadioGroupOption>,
            default: undefined
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

        const radioGroup = inject(RadioGroupKey, null);

        const rawColor = computed(() => props.color || radioGroup?.color.value);
        const rawSize = computed(() => props.size || radioGroup?.size.value);
        const { color } = useFormComponentColor(componentName, rawColor);
        const { size } = useFormComponentSize(componentName, rawSize);

        const name = toRef(props, 'name');
        const disabled = computed(() => Boolean(props.disabled || radioGroup?.disabled.value));
        const readonly = computed(() => Boolean(props.readonly || radioGroup?.readonly.value));
        const errorCondition = toRef(props, 'errorCondition');
        const {
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
            shouldValidate: true
        });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': isDisabled.value,
            '-readonly': isReadonly.value,
            '-native': props.native,
            '-error': hasError.value
        }));

        const tabIndex = computed(() => {
            return isDisabled.value ? -1 : props.tabindex;
        });

        const value = computed(() => props.option?.id ?? props.value);
        const isChecked = computed(() => {
            if (radioGroup?.value) {
                return radioGroup.value.value === value.value;
            }

            return !!props.modelValue;
        });

        function onChange(event: Event) {
            const target = event.target as HTMLInputElement;

            if (radioGroup) {
                radioGroup.onChange(value.value);
            } else {
                schemaOnInput(target.checked);
            }

            emit('update:modelValue', target.checked);
        }

        function labelOnBlur(event: FocusEvent) {
            if (radioGroup) {
                radioGroup.onBlur(event);
            } else {
                schemaOnBlur(event);
            }
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
            classes,
            isChecked,
            isDisabled,
            isReadonly,
            tabIndex,
            inputRef,
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
        class="radio"
        :class="classes"
        role="radio"
        :aria-checked="isChecked ? 'true' : 'false'"
        :aria-disabled="isDisabled ? 'true' : undefined"
        :aria-readonly="isReadonly ? 'true' : undefined"
    >
        <input
            ref="inputRef"
            :checked="isChecked"
            type="radio"
            :name="name"
            :disabled="isDisabled"
            :readonly="isReadonly"
            @change="onChange"
            @blur="labelOnBlur"
        />
        <label
            class="radio-label"
            :tabindex="tabIndex"
            @blur="labelOnBlur"
            @click="labelOnClick"
            @keydown.space.stop.prevent="labelOnKeydown"
        >
            <!-- @slot default Slot for default radio label -->
            <slot>
                <DynamicRenderer :render="label" :ctx="option" />
            </slot>
        </label>
    </div>
</template>
