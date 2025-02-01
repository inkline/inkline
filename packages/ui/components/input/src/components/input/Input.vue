<script lang="ts">
import type { PropType } from 'vue';
import { ref, computed, defineComponent, toRef, onBeforeUpdate } from 'vue';
import { filterKeys, uid } from '@inkline/utils';

import { Icon } from '@inkline/component-icon';
import type { FormStateKeys } from '@inkline/types';
import {
    useFormComponentColor,
    useFormComponentSize,
    useFormInputValidation
} from '@inkline/composables';

const componentName = 'Input';

export default defineComponent({
    name: componentName,
    components: {
        Icon
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
        errorCondition: {
            type: [Boolean, Array] as PropType<boolean | FormStateKeys[]>,
            default: undefined
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
        shouldValidate: {
            type: Boolean,
            default: true
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @type event
         * @name update:modelValue
         */
        'update:modelValue',
        /**
         * Event emitted when clearing the input element
         * @type event
         * @name clear
         */
        'clear',
        /**
         * Event emitted when toggling the password visibility
         * @type event
         * @name togglePassword
         */
        'togglePassword'
    ],
    setup(props, { attrs, emit, slots }) {
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

        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useFormComponentColor(componentName, rawColor);
        const { size } = useFormComponentSize(componentName, rawSize);

        const input = ref<HTMLInputElement | null>(null);

        const wrapperAttrsAllowlist = ['class', 'className', /^data-/];
        const wrapperAttrs = computed(() =>
            filterKeys(attrs, { allowlist: wrapperAttrsAllowlist })
        );
        const inputAttrs = computed(() => filterKeys(attrs, { denylist: wrapperAttrsAllowlist }));

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

        const tabIndex = computed(() => (isDisabled.value ? -1 : props.tabindex));

        const value = computed(() => {
            if (schema.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        const isClearable = computed(() => {
            return props.clearable && !isDisabled.value && !isReadonly.value && value.value !== '';
        });

        const slotsClasses = ref(getSlotsClasses());
        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': isDisabled.value,
            '-error': hasError.value,
            '-readonly': isReadonly.value,
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

        function onBlur(event: FocusEvent) {
            schemaOnBlur(event);
        }

        function onInput(event: Event) {
            const target = event.target as HTMLInputElement;

            schemaOnInput(target.value);
            emit('update:modelValue', target.value);
        }

        function onClear(event: Event) {
            event.stopPropagation();
            emit('clear', event);

            schemaOnInput('');
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
            isDisabled,
            isReadonly,
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
                :disabled="isDisabled"
                :aria-disabled="isDisabled ? 'true' : false"
                :readonly="isReadonly || plaintext"
                :aria-readonly="isReadonly || plaintext ? 'true' : false"
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
                :disabled="isDisabled"
                :aria-disabled="isDisabled ? 'true' : false"
                :readonly="isReadonly || plaintext"
                :aria-readonly="isReadonly || plaintext ? 'true' : false"
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
                    <Icon
                        v-show="isPasswordToggleable"
                        :name="showPassword ? 'ink:eye' : 'ink:eye-off'"
                        class="input-icon input-password-toggle"
                        role="button"
                        :aria-label="showPasswordToggleAriaLabel"
                        :aria-hidden="isPasswordToggleable ? 'false' : 'true'"
                        @click="onTogglePassword"
                    />
                </slot>

                <!-- @slot clearable Slot for the clearable button -->
                <slot v-if="clearable" name="clearable" :on-clear="onClear">
                    <Icon
                        v-show="isClearable"
                        name="ink:close"
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
