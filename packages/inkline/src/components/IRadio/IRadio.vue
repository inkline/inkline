<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref, toRef } from 'vue';
import { uid } from '@grozav/utils';
import { FormKey, FormGroupKey, RadioGroupKey } from '@inkline/inkline/constants';
import {
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation
} from '@inkline/inkline/composables';
import type { RadioGroupOption } from '@inkline/inkline/components';
import { IRenderResolver } from '@inkline/inkline/components/utils/IRenderResolver';

const componentName = 'IRadio';

export default defineComponent({
    name: componentName,
    components: { IRenderResolver },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the radio
         * @type light | dark
         * @default
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
            default: () => {
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
         * @default
         * @name sizeMultiplier
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
        },
        /**
         * The label to be displayed alongside the radio. Can be a string, number, render function, or component
         * @type String | Number | Boolean | Function | Object
         * @default undefined
         * @name label
         */
        label: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                RadioGroupOption['label']
            >,
            default: undefined
        },
        /**
         * The option object of the radio when used inside a radio group
         * @type Object
         * @default undefined
         * @name option
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
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = computed(
            () =>
                props.color ||
                radioGroup?.color.value ||
                formGroup?.color.value ||
                form?.color.value
        );
        const currentSize = computed(
            () => props.size || radioGroup?.size.value || formGroup?.size.value || form?.size.value
        );
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const disabled = computed(
            () =>
                props.disabled ||
                radioGroup?.disabled.value ||
                formGroup?.disabled.value ||
                form?.disabled.value
        );
        const readonly = computed(
            () =>
                props.readonly ||
                radioGroup?.readonly.value ||
                formGroup?.readonly.value ||
                form?.readonly.value
        );

        const name = toRef(props, 'name');
        const {
            schema,
            onInput: schemaOnInput,
            onBlur: schemaOnBlur
        } = useValidation({
            name
        });
        const error = toRef(props, 'error');
        const { hasError } = useFormValidationError({
            schema,
            error
        });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': disabled.value,
            '-readonly': readonly.value,
            '-native': props.native,
            '-error': hasError.value
        }));

        const tabindex = computed(() => {
            return disabled.value ? -1 : props.tabindex;
        });

        const value = computed(() => props.option?.id ?? props.value);
        const checked = computed(() => {
            if (radioGroup?.value) {
                return radioGroup.value.value === value.value;
            }

            return props.modelValue;
        });

        function onChange(event: Event) {
            const target = event.target as HTMLInputElement;

            if (radioGroup) {
                radioGroup.onChange(value.value);
            } else {
                schemaOnInput(name, target.checked);
            }

            emit('update:modelValue', target.checked);
        }

        function labelOnBlur(event: FocusEvent) {
            if (radioGroup) {
                radioGroup.onBlur(event);
            } else {
                schemaOnBlur(name, event);
            }
        }

        function labelOnClick(event: MouseEvent) {
            if (readonly.value) {
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
            disabled,
            readonly,
            tabindex,
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
        :aria-checked="checked ? 'true' : 'false'"
        :aria-disabled="disabled ? 'true' : undefined"
        :aria-readonly="readonly ? 'true' : undefined"
    >
        <input
            ref="inputRef"
            :checked="checked"
            type="radio"
            :name="name"
            :disabled="disabled"
            :readonly="readonly"
            @change="onChange"
            @blur="labelOnBlur"
        />
        <label
            class="radio-label"
            :tabindex="tabindex"
            @blur="labelOnBlur"
            @click="labelOnClick"
            @keydown.space.stop.prevent="labelOnKeydown"
        >
            <!-- @slot default Slot for default radio label -->
            <slot>
                <IRenderResolver :render="label" :ctx="option" />
            </slot>
        </label>
    </div>
</template>
