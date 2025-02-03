<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref, toRef } from 'vue';
import { uid } from '@inkline/utils';
import {
    useFormInputValidation,
    useFormComponentColor,
    useFormComponentSize
} from '@inkline/composables';
import { CheckboxGroupKey, FormStateKeys } from '@inkline/types';
import type { CheckboxGroupOption } from '@inkline/types';
import { DynamicRenderer } from '@inkline/component-dynamic-renderer';

const componentName = 'Checkbox';

export default defineComponent({
    name: componentName,
    components: { DynamicRenderer },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the checkbox
         * @param {'light' | 'dark'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the checkbox
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
         * The indeterminate state of the checkbox
         * @param {boolean} indeterminate
         * @default false
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * [Deprecated] Used to set the checkbox value when used inside a checkbox group
         * @param {boolean} value
         * @default false
         * @deprecated
         */
        value: {
            type: [String, Number, Boolean] as PropType<string | number | boolean>,
            default: undefined
        },
        /**
         * Used to set the checkbox value when used by itself
         * @param {boolean} modelValue
         * @default false
         */
        modelValue: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        /**
         * The unique identifier of the checkbox
         * @param {string} name
         * @default uid()
         */
        name: {
            type: String,
            default: () => {
                return uid('checkbox');
            }
        },
        /**
         * Displays the native browser checkbox input indicator
         * @param {boolean} native
         * @default false
         */
        native: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the checkbox
         * @param {boolean} readonly
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the checkbox
         * @param {'sm' | 'md' | 'lg'} sizeMultiplier
         * @default
         *
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The tabindex of the checkbox
         * @param {number | string} tabindex
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
        },
        /**
         * The label to be displayed alongside the checkbox. Can be a string, number, render function, or component
         * @param {string | number | boolean | Function | Object} label
         * @default undefined
         */
        label: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                CheckboxGroupOption['label']
            >,
            default: undefined
        },
        /**
         * The option object of the checkbox when used inside a checkbox group
         * @param {Object} option
         * @default undefined
         */
        option: {
            type: Object as PropType<CheckboxGroupOption>,
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

        const checkboxGroup = inject(CheckboxGroupKey, null);

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

        const value = computed(() => props.option?.id ?? props.value);
        const checked = computed(() => {
            if (schema.value && shouldValidate.value) {
                return Boolean(schema.value.value);
            } else if (checkboxGroup?.value) {
                return checkboxGroup.value.value?.includes(value.value);
            }

            return props.modelValue;
        });

        const tabIndex = computed(() => {
            return isDisabled.value ? -1 : props.tabindex;
        });

        function onChange(event: Event) {
            const target = event.target as HTMLInputElement;

            if (checkboxGroup) {
                checkboxGroup.onChange(value.value);
            } else {
                schemaOnInput(target.checked);
            }

            emit('update:modelValue', target.checked);
        }

        function labelOnBlur(event: FocusEvent) {
            if (checkboxGroup) {
                checkboxGroup.onBlur(event);
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
            checked,
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
        class="checkbox"
        :class="classes"
        :aria-checked="checked ? 'true' : 'false'"
        :aria-disabled="isDisabled ? 'true' : undefined"
        :aria-readonly="isReadonly ? 'true' : undefined"
        role="checkbox"
    >
        <input
            ref="inputRef"
            type="checkbox"
            :checked="checked"
            :name="name"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :indeterminate.prop="indeterminate"
            aria-hidden="true"
            tabindex="-1"
            :aria-checked="checked"
            :aria-readonly="isReadonly"
            @change="onChange"
            @blur="labelOnBlur"
        />
        <label
            class="checkbox-label"
            :tabindex="tabIndex"
            @blur="labelOnBlur"
            @click="labelOnClick"
            @keydown.space.stop.prevent="labelOnKeydown"
        >
            <!-- @slot default Slot for default checkbox label -->
            <slot>
                <DynamicRenderer :render="label" :ctx="option" />
            </slot>
        </label>
    </div>
</template>
