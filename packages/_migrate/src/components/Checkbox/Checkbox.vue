<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref, toRef } from 'vue';
import { uid } from '@inkline/utils';
import {
    useComponentColor,
    useComponentSize,
    useValidation,
    useFormValidationError
} from '@inkline/inkline/composables';
import { CheckboxGroupKey, FormKey, FormGroupKey } from '@inkline/inkline/constants';
import type { CheckboxGroupOption } from '@inkline/inkline/components';
import { RenderResolver } from '@inkline/inkline/components/utils/RenderResolver';

const componentName = 'Checkbox';

export default defineComponent({
    name: componentName,
    components: { RenderResolver },
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
         * [Deprecated] Used to set the checkbox value when used inside a checkbox group
         * @default false
         * @name value
         * @deprecated
         */
        value: {
            type: [String, Number, Boolean] as PropType<string | number | boolean>,
            default: undefined
        },
        /**
         * Used to set the checkbox value when used by itself
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Boolean as PropType<boolean>,
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
         * Enable checkbox validation using schema
         * @type Boolean
         * @default true
         * @name validateSchema
         */
        validate: {
            type: Boolean,
            default: true
        },
        /**
         * The label to be displayed alongside the checkbox. Can be a string, number, render function, or component
         * @type String | Number | Boolean | Function | Object
         * @default undefined
         * @name label
         */
        label: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                CheckboxGroupOption['label']
            >,
            default: undefined
        },
        /**
         * The option object of the checkbox when used inside a checkbox group
         * @type Object
         * @default undefined
         * @name option
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
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = computed(
            () =>
                props.color ||
                checkboxGroup?.color.value ||
                formGroup?.color.value ||
                form?.color.value
        );
        const currentSize = computed(
            () =>
                props.size || checkboxGroup?.size.value || formGroup?.size.value || form?.size.value
        );
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const isDisabled = computed(
            () =>
                props.disabled ||
                checkboxGroup?.disabled.value ||
                formGroup?.disabled.value ||
                form?.disabled.value
        );
        const isReadonly = computed(
            () =>
                props.readonly ||
                checkboxGroup?.readonly.value ||
                formGroup?.readonly.value ||
                form?.readonly.value
        );

        const name = toRef(props, 'name');
        const validate = toRef(props, 'validate');
        const {
            schema,
            onInput: schemaOnInput,
            onBlur: schemaOnBlur
        } = useValidation({
            name,
            validate
        });
        const error = toRef(props, 'error');
        const { hasError } = useFormValidationError({
            schema,
            error
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
            if (schema.value && validate.value) {
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
                schemaOnInput(name, target.checked);
            }

            emit('update:modelValue', target.checked);
        }

        function labelOnBlur(event: FocusEvent) {
            if (checkboxGroup) {
                checkboxGroup.onBlur(event);
            } else {
                schemaOnBlur(name, event);
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
                <RenderResolver :render="label" :ctx="option" />
            </slot>
        </label>
    </div>
</template>
