<script lang="ts">
import { computed, defineComponent, type PropType, provide, ref, toRef } from 'vue';
import {
    useComponentColor,
    useComponentSize,
    useValidation,
    useFormValidationError
} from '@inkline/inkline/composables';
import { uid } from '@inkline/utils';
import { FormKey } from '@inkline/inkline/constants';
import { FormStateKeys } from '@inkline/types';

const componentName = 'Form';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the form
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the form
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Display the form as inline
         * @type Boolean
         * @default false
         * @name inline
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The loading state of the form
         * @type Boolean
         * @default false
         * @name loading
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * The unique identifier of the form
         * @type String
         * @default undefined
         * @name name
         */
        name: {
            type: String,
            default: uid('form')
        },
        /**
         * Used to set the form schema
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Object,
            default: undefined
        },
        /**
         * The readonly state of the form
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the form
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Enable form validation using schema
         * @type Boolean
         * @default true
         * @name validateSchema
         */
        validate: {
            type: Boolean,
            default: true
        },
        /**
         * The error state of the input, computed based on schema by default.
         * @type Boolean | Array
         * @default ['touched', 'dirty', 'invalid']
         * @name errorCondition
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
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { size } = useComponentSize({ componentName, size: currentSize });
        const { color } = useComponentColor({ componentName, color: currentColor });

        const disabled = computed(() => props.disabled);
        const readonly = computed(() => props.readonly);

        const errorCondition = toRef(props, 'errorCondition');
        const validate = toRef(props, 'validate');
        const modelValue = toRef(props, 'modelValue');
        const {
            schema,
            onBlur,
            onInput,
            onSubmit: schemaOnSubmit
        } = useValidation({
            validate,
            schema: modelValue,
            onUpdate: (model: any) => {
                emit('update:modelValue', model);
            },
            onSubmit: (event: SubmitEvent) => {
                emit('submit', event);
            }
        });
        const error = ref(['invalid']);
        const { hasError } = useFormValidationError({
            schema,
            error
        });

        const classes = computed(() => ({
            [`-${size.value}`]: true,
            [`-${color.value}`]: true,
            '-disabled': props.disabled,
            '-readonly': props.readonly,
            '-inline': props.inline,
            '-error': hasError.value
        }));

        function onSubmit(e: Event) {
            const event = e as SubmitEvent;

            if (props.modelValue) {
                void schemaOnSubmit(event);
            } else {
                emit('submit', event);
            }
        }

        provide(FormKey, {
            schema,
            disabled,
            readonly,
            errorCondition,
            size,
            color,
            onBlur,
            onInput
        });

        return {
            classes,
            onSubmit
        };
    }
});
</script>

<template>
    <form
        v-bind="$attrs"
        class="form"
        :class="classes"
        role="form"
        :name="name"
        :readonly="readonly"
        :disabled="disabled"
        @submit.prevent="onSubmit"
    >
        <!-- @slot default Slot for form content -->
        <slot />
    </form>
</template>
