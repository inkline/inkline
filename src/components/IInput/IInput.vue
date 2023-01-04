<script lang="ts">
import { ref, computed, inject, PropType, defineComponent, toRef } from 'vue';
import { filterKeys, uid } from '@grozav/utils';

import {
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation
} from '@inkline/inkline/composables';
import { FormKey } from '@inkline/inkline/components/IForm/mixin';
import { FormGroupKey } from '@inkline/inkline/components/IFormGroup/mixin';

const componentName = 'IInput';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the input
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * Display the input as clearable
         * @type Boolean
         * @default false
         * @name clearable
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the input
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
        error: {
            type: [Array, Boolean] as PropType<boolean | string[]>,
            default: () => ['touched', 'dirty', 'invalid']
        },
        /**
         * The id of the internal input element
         * @type String
         * @default
         * @name id
         */
        id: {
            type: String,
            default: undefined
        },
        /**
         * The id of the input wrapper element
         * @type String
         * @default
         * @name wrapperId
         */
        wrapperId: {
            type: String,
            default: undefined
        },
        /**
         * Used to set the field value
         * @type String | Number
         * @default ''
         * @name modelValue
         */
        modelValue: {
            type: [String, Number],
            default: ''
        },
        /**
         * The unique identifier of the input
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default() {
                return uid('input');
            }
        },
        /**
         * Display the input as plaintext, disabling interaction
         * @type Boolean
         * @default false
         * @name plaintext
         */
        plaintext: {
            type: Boolean,
            default: false
        },
        /**
         * The readonly state of the input
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the input
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The tabindex of the input
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * The type of the input
         * @type String
         * @default text
         * @name type
         */
        type: {
            type: String,
            default: 'text'
        },
        /**
         * The aria-label of the clear button
         * @type String
         * @default Clear
         * @name clearAriaLabel
         */
        clearAriaLabel: {
            type: String,
            default: 'Clear'
        },
        /**
         * Enable input validation using schema
         * @type Boolean
         * @default true
         * @name validate
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
        'update:modelValue',
        /**
         * Event emitted when clearing the input element
         * @event clear
         */
        'clear'
    ],
    setup(props, { attrs, emit, slots }) {
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = computed(
            () => props.color || formGroup?.color.value || form?.color.value
        );
        const currentSize = computed(() => props.size || formGroup?.size.value || form?.size.value);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const disabled = computed(
            () => !!(props.disabled || formGroup?.disabled.value || form?.disabled.value)
        );
        const readonly = computed(
            () => !!(props.readonly || formGroup?.readonly.value || form?.readonly.value)
        );

        const input = ref<HTMLInputElement | null>(null);

        const wrapperAttrsAllowlist = ['class', 'className', /^data-/];
        const wrapperAttrs = computed(() =>
            filterKeys(attrs, { allowlist: wrapperAttrsAllowlist })
        );
        const inputAttrs = computed(() => filterKeys(attrs, { denylist: wrapperAttrsAllowlist }));

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
        const { hasError } = useFormValidationError({
            schema,
            error: props.error
        });

        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        const value = computed(() => {
            if (schema.value && validate.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        const clearable = computed(() => {
            return props.clearable && !disabled.value && !readonly.value && value.value !== '';
        });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': disabled.value,
            '-error': hasError.value,
            '-readonly': readonly.value,
            '-prefixed': Boolean(slots.prefix),
            '-suffixed': Boolean(slots.suffix),
            '-prepended': Boolean(slots.prepend),
            '-appended': Boolean(slots.append)
        }));

        function onBlur(event: Event) {
            schemaOnBlur(props.name, event);
        }

        function onInput(event: Event) {
            const target = event.target as HTMLInputElement;

            schemaOnInput(props.name, target.value);
            emit('update:modelValue', target.value);
        }

        function onClear(event: Event) {
            event.stopPropagation();
            emit('clear', event);

            schemaOnInput(props.name, '');
            emit('update:modelValue', '');
        }

        return {
            input,
            wrapperAttrs,
            inputAttrs,
            tabIndex,
            value,
            clearable,
            classes,
            onBlur,
            onInput,
            onClear
        };
    }
});
</script>

<template>
    <div :id="id && `${id}-wrapper`" class="input-wrapper" :class="classes" v-bind="wrapperAttrs">
        <div v-if="$slots.prepend" class="input-prepend">
            <!-- @slot prepend Slot for the input prepend content -->
            <slot name="prepend" />
        </div>
        <div class="input">
            <span v-if="$slots.prefix" class="input-prefix">
                <!-- @slot prefix Slot for the input prefix content -->
                <slot name="prefix" />
            </span>
            <input
                v-bind="inputAttrs"
                :id="id"
                ref="input"
                :value="value"
                :name="name"
                :type="type"
                :tabindex="tabIndex"
                :disabled="disabled"
                :aria-disabled="disabled ? 'true' : false"
                :readonly="readonly || plaintext"
                :aria-readonly="readonly || plaintext ? 'true' : false"
                @input="onInput"
                @blur="onBlur"
            />
            <span v-if="$slots.suffix || clearable" class="input-suffix">
                <!-- @slot clearable Slot for the clearable button -->
                <slot name="clearable" :clear="onClear">
                    <i
                        v-if="clearable"
                        v-show="clearable"
                        class="input-clear"
                        role="button"
                        :aria-label="clearAriaLabel"
                        :aria-hidden="clearable ? 'false' : 'true'"
                        @click="onClear"
                    />
                </slot>
                <!-- @slot suffix Slot for the input suffix content -->
                <slot name="suffix" />
            </span>
        </div>
        <div v-if="$slots.append" class="input-append">
            <!-- @slot append Slot for the input append content -->
            <slot name="append" />
        </div>
    </div>
</template>
