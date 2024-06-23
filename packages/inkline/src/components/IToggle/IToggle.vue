<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref, toRef } from 'vue';
import { uid } from '@grozav/utils';
import { FormKey, FormGroupKey } from '@inkline/inkline/constants';
import {
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation
} from '@inkline/inkline/composables';

const componentName = 'IToggle';

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
         * Enable toggle validation using schema
         * @type Boolean
         * @default true
         * @name validateSchema
         */
        validate: {
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

        const currentColor = computed(
            () => props.color || formGroup?.color.value || form?.color.value
        );
        const currentSize = computed(() => props.size || formGroup?.size.value || form?.size.value);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const disabled = computed(
            () => props.disabled || formGroup?.disabled.value || form?.disabled.value
        );
        const readonly = computed(
            () => props.readonly || formGroup?.readonly.value || form?.readonly.value
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
            '-disabled': disabled.value,
            '-readonly': readonly.value,
            '-native': props.native,
            '-error': hasError.value
        }));

        const checked = computed(() => {
            if (schema.value) {
                return Boolean(schema.value.value);
            }

            return props.modelValue;
        });

        const tabindex = computed(() => {
            return disabled.value ? -1 : props.tabindex;
        });

        function onChange(event: Event) {
            const target = event.target as HTMLInputElement;

            schemaOnInput(name, target.checked);
            emit('update:modelValue', target.checked);
        }

        function labelOnBlur(event: FocusEvent) {
            schemaOnBlur(name, event);
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
            inputRef,
            classes,
            checked,
            disabled,
            readonly,
            tabindex,
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
        :aria-disabled="disabled"
        :aria-readonly="readonly"
        role="checkbox"
    >
        <input
            ref="inputRef"
            type="checkbox"
            :checked="checked"
            :disabled="disabled"
            :readonly="readonly"
            :aria-checked="checked"
            :aria-disabled="disabled"
            :aria-readonly="readonly"
            :name="name"
            @change="onChange"
        />
        <label
            class="toggle-label"
            :tabindex="tabindex"
            @click="labelOnClick"
            @blur="labelOnBlur"
            @keydown.space.stop.prevent="labelOnKeydown"
        >
            <!-- @slot default Slot for default toggle label -->
            <slot />
        </label>
    </div>
</template>
