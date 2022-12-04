<script lang="ts">
import { computed, defineComponent, inject, provide, toRef } from 'vue';
import {
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation
} from '@inkline/inkline/composables';
import { FormKey } from '../IForm';
import { FormGroupKey } from './mixin';

const componentName = 'IFormGroup';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the form group
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The disabled state of the form group
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Display the form group as inline
         * @type Boolean
         * @default false
         * @name inline
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The identifier of the form group
         * @type String
         * @default
         * @name name
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * The readonly state of the form group
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The required state of the form group
         * @type Boolean
         * @default false
         * @name required
         */
        required: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the form group
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        },
        /**
         * Enable form validation using schema
         * @type Boolean
         * @default true
         * @name validate
         */
        validate: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const name = toRef(props, 'name');
        const validate = toRef(props, 'validate');
        const { schema, onBlur, onInput } = useValidation({ name, validate });
        const { hasError } = useFormValidationError({
            schema,
            error: ['invalid']
        });

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

        const classes = computed(() => ({
            [`-${size.value}`]: true,
            [`-${color.value}`]: true,
            '-disabled': disabled.value,
            '-readonly': readonly.value,
            '-inline': props.inline,
            '-error': hasError.value,
            '-required': props.required // @TODO Add required state based on required validator this.input.schema?.validators.some(v => v.name === 'required')
        }));

        provide(FormGroupKey, {
            disabled,
            readonly,
            size,
            color,
            onBlur,
            onInput
        });

        return {
            classes,
            disabled,
            readonly,
            size,
            color,
            onBlur,
            onInput
        };
    }
});
</script>

<template>
    <fieldset class="form-group" :class="classes" :name="name" role="group">
        <!-- @slot default Slot for default form group content -->
        <slot />
    </fieldset>
</template>
