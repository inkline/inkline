<script lang="ts">
import { computed, defineComponent, type PropType, provide, toRef } from 'vue';
import { useComponentColor, useComponentSize, useFormValidation } from '@inkline/composables';
import { uid } from '@inkline/utils';
import { FormValues, FormKey, ResolvedFormSchema, ValidateOnEvent } from '@inkline/types';
import type { FormStateKeys } from '@inkline/types';

const componentName = 'Form';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the form
         * @param {'light' | 'dark'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the form
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Display the form as inline
         * @param {boolean} inline
         * @default false
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The loading state of the form
         * @param {boolean} loading
         * @default false
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * The unique identifier of the form
         * @param {string} name
         * @default undefined
         */
        name: {
            type: String,
            default: uid('form')
        },
        /**
         * Used to set the form schema
         * @param {boolean} modelValue
         * @default false
         */
        modelValue: {
            type: Object as PropType<ResolvedFormSchema<FormValues>>,
            default: undefined
        },
        /**
         * The readonly state of the form
         * @param {boolean} readonly
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the form
         * @param {'sm' | 'md' | 'lg'} size
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Enable form validation using schema
         * @param {boolean} shouldValidate
         * @default true
         */
        shouldValidate: {
            type: Boolean,
            default: true
        },
        /**
         * The events to validate the form on
         * @param {Array | number} validateOn
         * @default undefined
         */
        validateOn: {
            type: [Array, String] as PropType<ValidateOnEvent[] | ValidateOnEvent>,
            default: undefined
        },
        /**
         * The error state of the input, computed based on schema by default.
         * @param {boolean | Array} errorCondition
         * @default ['touched', 'dirty', 'invalid']
         */
        errorCondition: {
            type: [Boolean, Array] as PropType<boolean | FormStateKeys[]>,
            default: () => ['touched', 'dirty', 'invalid']
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue schema
         * @event update:modelValue
         */
        'update:modelValue',
        /**
         * Event emitted for submitting the form
         * @event submit
         */
        'submit'
    ],
    setup(props, { emit }) {
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { size } = useComponentSize(componentName, rawSize);
        const { color } = useComponentColor(componentName, rawColor);

        const disabled = toRef(props, 'disabled');
        const readonly = toRef(props, 'readonly');
        const errorCondition = toRef(props, 'errorCondition');
        const shouldValidate = toRef(props, 'shouldValidate');
        const validateOn = toRef(props, 'validateOn');
        const modelValue = toRef(props, 'modelValue');
        const {
            schema,
            hasError,
            isDisabled,
            isReadonly,
            onBlur,
            onInput,
            onSubmit: schemaOnSubmit
        } = useFormValidation({
            shouldValidate,
            validateOn,
            disabled,
            readonly,
            schema: modelValue,
            errorCondition,
            onUpdate: emitUpdateModelValue,
            onSubmit: emitSubmit
        });

        const classes = computed(() => ({
            [`-${size.value}`]: true,
            [`-${color.value}`]: true,
            '-disabled': isDisabled.value,
            '-readonly': isReadonly.value,
            '-inline': props.inline,
            '-error': hasError.value
        }));

        function emitUpdateModelValue(model: ResolvedFormSchema<any>) {
            emit('update:modelValue', model);
        }

        function emitSubmit(event: SubmitEvent) {
            emit('submit', event);
        }

        function onSubmit(e: Event) {
            const event = e as SubmitEvent;

            if (props.modelValue) {
                void schemaOnSubmit(event);
            } else {
                emitSubmit(event);
            }
        }

        provide(FormKey, {
            schema,
            disabled: isDisabled,
            readonly: isReadonly,
            errorCondition,
            size,
            color,
            onBlur,
            onInput
        });

        return {
            classes,
            isDisabled,
            isReadonly,
            onSubmit
        };
    }
});
</script>

<template>
    <form
        class="form"
        :class="classes"
        role="form"
        :name="name"
        :readonly="isReadonly"
        :disabled="isDisabled"
        @submit.prevent="onSubmit"
    >
        <!-- @slot default Slot for form content -->
        <slot />
    </form>
</template>
