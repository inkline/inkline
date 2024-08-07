<script lang="ts">
import type { PropType } from 'vue';
import { ref, computed, inject, defineComponent, toRef, onBeforeUpdate } from 'vue';
import { filterKeys, uid } from '@grozav/utils';

import {
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation
} from '@inkline/inkline/composables';
import { FormKey, FormGroupKey } from '@inkline/inkline/constants';
import { IIcon } from '@inkline/inkline/components/IIcon';

const componentName = 'IInput';

export default defineComponent({
    name: componentName,
    components: {
        IIcon
    },
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
            default: () => {
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
         * @name sizeMultiplier
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
         * The aria-label of the show password toggle button
         * @type String
         * @default Toggle password visibility
         * @name showPasswordToggleAriaLabel
         */
        showPasswordToggleAriaLabel: {
            type: String,
            default: 'Toggle password visibility'
        },
        /**
         * Display the password toggle button
         * @type Boolean
         * @default true
         * @name showPasswordToggle
         */
        showPasswordToggle: {
            type: Boolean,
            default: true
        },
        /**
         * Enable input validation using schema
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
        'update:modelValue',
        /**
         * Event emitted when clearing the input element
         * @event clear
         */
        'clear',
        /**
         * Event emitted when toggling the password visibility
         * @event togglePassword
         */
        'togglePassword'
    ],
    setup(props, { attrs, emit, slots }) {
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = computed(
            () => props.color || formGroup?.color.value || form?.color.value
        );
        const currentSize = computed(() => props.size || formGroup?.size.value || form?.size.value);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

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
        const error = toRef(props, 'error');
        const { hasError } = useFormValidationError({
            schema,
            error
        });

        const showPassword = ref(false);
        const isPasswordToggleable = computed(() => {
            return props.showPasswordToggle && props.type === 'password' && value.value !== '';
        });

        const inputType = computed(() => {
            if (props.type === 'password' && showPassword.value) {
                return 'text';
            }

            return props.type;
        });

        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        const value = computed(() => {
            if (schema.value && validate.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        const isClearable = computed(() => {
            return props.clearable && !disabled.value && !readonly.value && value.value !== '';
        });

        const slotsClasses = ref(getSlotsClasses());
        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': disabled.value,
            '-error': hasError.value,
            '-readonly': readonly.value,
            ...slotsClasses.value
        }));

        onBeforeUpdate(() => {
            slotsClasses.value = getSlotsClasses();
        });

        function getSlotsClasses() {
            return {
                '-prefixed': Boolean(slots.prefix),
                '-suffixed': Boolean(slots.suffix),
                '-prepended': Boolean(slots.prepend),
                '-appended': Boolean(slots.append)
            };
        }

        function onBlur(event: Event) {
            schemaOnBlur(name, event);
        }

        function onInput(event: Event) {
            const target = event.target as HTMLInputElement;

            schemaOnInput(name, target.value);
            emit('update:modelValue', target.value);
        }

        function onClear(event: Event) {
            event.stopPropagation();
            emit('clear', event);

            schemaOnInput(name, '');
            emit('update:modelValue', '');
        }

        function onTogglePassword(event: Event) {
            event.stopPropagation();
            emit('togglePassword', event);

            showPassword.value = !showPassword.value;
        }

        return {
            input,
            wrapperAttrs,
            inputAttrs,
            tabIndex,
            value,
            inputType,
            isClearable,
            isPasswordToggleable,
            showPassword,
            classes,
            onBlur,
            onInput,
            onClear,
            onTogglePassword
        };
    }
});
</script>

<template>
    <div :id="id" class="input" :class="classes" v-bind="wrapperAttrs">
        <div v-if="$slots.prepend" class="input-prepend">
            <!-- @slot prepend Slot for the input prepend content -->
            <slot name="prepend" />
        </div>
        <div class="input-field">
            <span v-if="$slots.prefix" class="input-prefix">
                <!-- @slot prefix Slot for the input prefix content -->
                <slot name="prefix" />
            </span>
            <div v-if="$slots.value" class="input-value-overlay">
                <slot name="value" />
            </div>
            <input
                v-if="type !== 'textarea'"
                v-bind="inputAttrs"
                :id="id"
                ref="input"
                :value="value"
                :name="name"
                :type="inputType"
                :tabindex="tabIndex"
                :disabled="disabled"
                :aria-disabled="disabled ? 'true' : false"
                :readonly="readonly || plaintext"
                :aria-readonly="readonly || plaintext ? 'true' : false"
                @input="onInput"
                @blur="onBlur"
            />
            <textarea
                v-else
                v-bind="inputAttrs"
                :id="id"
                ref="input"
                :value="value"
                role="textbox"
                :name="name"
                :tabindex="tabIndex"
                :disabled="disabled"
                :aria-disabled="disabled ? 'true' : false"
                :readonly="readonly || plaintext"
                :aria-readonly="readonly || plaintext ? 'true' : false"
                aria-multiline="true"
                @input="onInput"
                @blur="onBlur"
            />
            <span v-if="$slots.suffix || isClearable || isPasswordToggleable" class="input-suffix">
                <!-- @slot password-toggle Slot for the password toggle button -->
                <slot
                    v-if="showPasswordToggle && type === 'password'"
                    name="password-toggle"
                    :on-toggle-password="onTogglePassword"
                >
                    <IIcon
                        v-show="isPasswordToggleable"
                        :name="showPassword ? 'ink-eye' : 'ink-eye-off'"
                        class="input-icon input-password-toggle"
                        role="button"
                        :aria-label="showPasswordToggleAriaLabel"
                        :aria-hidden="isPasswordToggleable ? 'false' : 'true'"
                        @click="onTogglePassword"
                    />
                </slot>

                <!-- @slot clearable Slot for the clearable button -->
                <slot v-if="clearable" name="clearable" :on-clear="onClear">
                    <IIcon
                        v-show="isClearable"
                        name="ink-clear"
                        class="input-icon input-clear"
                        role="button"
                        :aria-label="clearAriaLabel"
                        :aria-hidden="isClearable ? 'false' : 'true'"
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
