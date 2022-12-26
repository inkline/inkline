<script lang="ts">
import {
    computed,
    defineComponent,
    inject,
    PropType,
    ref,
    toRef,
    watch,
} from "vue";
import { IButton } from "@inkline/inkline/components/IButton";
import { filterKeys, uid } from "@grozav/utils";
import { InputElementEvent } from "@inkline/inkline/types";
import {
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation,
} from "@inkline/inkline/composables";
import { FormKey } from "@inkline/inkline/components/IForm/mixin";
import { FormGroupKey } from "@inkline/inkline/components/IFormGroup/mixin";

const componentName = "INumberInput";

export default defineComponent({
    name: componentName,
    components: {
        IButton,
    },
    props: {
        /**
         * The color variant of the input
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined,
        },
        /**
         * Display the input as clearable
         * @type Boolean
         * @default false
         * @name clearable
         */
        clearable: {
            type: Boolean,
            default: false,
        },
        /**
         * The disabled state of the input
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false,
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
            default: () => ["touched", "dirty", "invalid"],
        },
        /**
         * The id of the internal input element
         * @type String
         * @default
         * @name id
         */
        id: {
            type: String,
            default: "",
        },
        /**
         * Used to set the field value
         * @type String | Number
         * @default
         * @name modelValue
         */
        modelValue: {
            type: [String, Number],
            default: "",
        },
        /**
         * The unique identifier of the input
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default(): string {
                return uid("input");
            },
        },
        /**
         * Display the input as plaintext, disabling interaction
         * @type Boolean
         * @default false
         * @name plaintext
         */
        plaintext: {
            type: Boolean,
            default: false,
        },
        /**
         * The readonly state of the input
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false,
        },
        /**
         * The size variant of the input
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined,
        },
        /**
         * The tabindex of the input
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0,
        },
        /**
         * The minimum allowed input value
         * @type Number
         * @default -Infinity
         * @name min
         */
        min: {
            type: [Number, String],
            default: -Infinity,
        },
        /**
         * The maximum allowed input value
         * @type Number
         * @default +Infinity
         * @name max
         */
        max: {
            type: [Number, String],
            default: Infinity,
        },
        /**
         * The precision of the input value, for floating point numbers
         * @type Number
         * @default 0
         * @name precision
         */
        precision: {
            type: Number,
            default: 0,
        },
        /**
         * The increment step to increase or decrease the value by
         * @type Number
         * @default 1
         * @name step
         */
        step: {
            type: Number,
            default: 1,
        },
        /**
         * The aria-label of the clear button
         * @type String
         * @default Clear
         * @name clearAriaLabel
         */
        clearAriaLabel: {
            type: String,
            default: "Clear",
        },
        /**
         * Enable number input validation using schema
         * @type Boolean
         * @default true
         * @name validate
         */
        validate: {
            type: Boolean,
            default: true,
        },
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        "update:modelValue",
        /**
         * Event emitted when clearing the input element
         * @event clear
         */
        "clear",
    ],
    setup(props, { attrs, emit, slots }) {
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = toRef(props, "color");
        const currentSize = toRef(props, "size");
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const disabled = computed(
            () =>
                !!(
                    props.disabled ||
                    formGroup?.disabled.value ||
                    form?.disabled.value
                )
        );
        const readonly = computed(
            () =>
                !!(
                    props.readonly ||
                    formGroup?.readonly.value ||
                    form?.readonly.value
                )
        );

        const input = ref<HTMLInputElement | null>(null);

        const wrapperAttrsAllowlist = ["class", "className", /^data-/];
        const wrapperAttrs = computed(() =>
            filterKeys(attrs, { allowlist: wrapperAttrsAllowlist })
        );
        const inputAttrs = computed(() =>
            filterKeys(attrs, { denylist: wrapperAttrsAllowlist })
        );

        const name = toRef(props, "name");
        const validate = toRef(props, "validate");
        const {
            schema,
            onInput: schemaOnInput,
            onBlur: schemaOnBlur,
        } = useValidation({
            name,
            validate,
        });
        const { hasError } = useFormValidationError({
            schema,
            error: props.error,
        });

        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        const value = computed(() => {
            if (schema.value && validate.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        const clearable = computed(() => {
            return (
                props.clearable &&
                !disabled.value &&
                !readonly.value &&
                value.value !== ""
            );
        });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            "-disabled": disabled.value,
            "-error": hasError.value,
            "-readonly": readonly.value,
            "-prefixed": Boolean(slots.prefix),
            "-suffixed": Boolean(slots.suffix),
            "-prepended": Boolean(slots.prepend),
            "-appended": Boolean(slots.append),
        }));

        watch(
            () => value.value,
            (value) => {
                let newValue = (value || "")
                    .toString()
                    .replace(/^[^0-9-]/, "")
                    .replace(/^(-)[^0-9]/, "$1")
                    .replace(
                        new RegExp(
                            `^(-?[0-9]+)[^0-9${props.precision > 0 ? "." : ""}]`
                        ),
                        "$1"
                    );

                if (props.precision > 0) {
                    newValue = newValue
                        .replace(/^(-?[0-9]+\.)[^0-9]/, "$1")
                        .replace(
                            new RegExp(
                                `^(-?[0-9]+\\.[0-9]{0,${props.precision}}).*`
                            ),
                            "$1"
                        );
                }

                if (parseFloat(newValue) >= parseFloat(props.max as string))
                    newValue = props.max.toString();
                if (parseFloat(newValue) <= parseFloat(props.min as string))
                    newValue = props.min.toString();

                schemaOnInput(props.name, newValue);
                emit("update:modelValue", newValue);
            }
        );

        function onBlur(event: Event) {
            schemaOnBlur(props.name, event);
        }

        function updateModelValue(value: string) {
            schemaOnInput(props.name, value);
            emit("update:modelValue", value);
        }

        function onInput(event: Event) {
            const target = event.target as HTMLInputElement;

            updateModelValue(target.value);
        }

        function onClear(event: Event) {
            emit("clear", event);

            updateModelValue("");
        }

        function decrease() {
            if (disabled.value || readonly.value) {
                return;
            }

            updateModelValue(
                formatPrecision((Number(value.value) - props.step).toString())
            );
        }

        function increase() {
            if (disabled.value || readonly.value) {
                return;
            }

            updateModelValue(
                formatPrecision((Number(value.value) + props.step).toString())
            );
        }

        function formatPrecision(value: string) {
            const parts = value.split(".");
            let decimals = parts[1] || "";

            for (let i = decimals.length; i < props.precision; i += 1) {
                decimals += "0";
            }

            return props.precision > 0 ? `${parts[0]}.${decimals}` : parts[0];
        }

        function onBlurFormatPrecision(event: InputElementEvent) {
            if (disabled.value || readonly.value) {
                return;
            }

            updateModelValue(formatPrecision(Number(value.value).toString()));
            onBlur(event);
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
            onClear,
            decrease,
            increase,
            onBlurFormatPrecision,
        };
    },
});
</script>

<template>
    <div
        :id="id && `${id}-wrapper`"
        class="input-wrapper -prepended -appended"
        :class="classes"
        v-bind="wrapperAttrs"
    >
        <div class="input-prepend">
            <slot name="prepend" />
            <IButton
                type="button"
                :color="color"
                :size="size"
                :disabled="disabled"
                class="input-button-decrease"
                @click="decrease"
            >
                -
            </IButton>
        </div>
        <div class="input">
            <span v-if="$slots.prefix" class="input-prefix">
                <slot name="prefix" />
            </span>
            <input
                v-bind="inputAttrs"
                :id="id"
                ref="input"
                :value="value"
                :name="name"
                type="text"
                :tabindex="tabIndex"
                :disabled="disabled"
                :aria-disabled="disabled ? 'true' : false"
                :readonly="readonly || plaintext"
                :aria-readonly="readonly || plaintext ? 'true' : false"
                @input="onInput"
                @blur="onBlur"
            />
            <span v-if="$slots.suffix || clearable" class="input-suffix">
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
                <slot name="suffix" />
            </span>
        </div>
        <div class="input-append">
            <IButton
                type="button"
                :color="color"
                :size="size"
                :disabled="disabled"
                class="input-button-increase"
                @click="increase"
            >
                +
            </IButton>
            <slot name="append" />
        </div>
    </div>
</template>
