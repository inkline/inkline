<script lang="ts">
import { computed, defineComponent, inject, provide, ref, toRef } from 'vue';
import {
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation
} from '@inkline/inkline/composables';
import { FormKey, FormGroupKey } from '@inkline/inkline/constants';

const componentName = 'FormGroup';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the form group
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
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
         * @default
         * @name size
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
        }
    },
    setup(props) {
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const name = toRef(props, 'name');
        const validate = toRef(props, 'validate');
        const { schema, onBlur, onInput } = useValidation({ name, validate });
        const error = ref(['invalid']);
        const { hasError } = useFormValidationError({
            schema,
            error
        });

        const color = computed(() => props.color || formGroup?.color.value || form?.color.value);
        const size = computed(() => props.size || formGroup?.size.value || form?.size.value);
        const { color: resolvedColor } = useComponentColor({ componentName, color });
        const { size: resolvedSize } = useComponentSize({ componentName, size });

        const isDisabled = computed(
            () => !!(props.disabled || formGroup?.disabled.value || form?.disabled.value)
        );
        const isReadonly = computed(
            () => !!(props.readonly || formGroup?.readonly.value || form?.readonly.value)
        );

        const classes = computed(() => ({
            [`-${resolvedSize.value}`]: true,
            [`-${resolvedColor.value}`]: true,
            '-disabled': isDisabled.value,
            '-readonly': isReadonly.value,
            '-inline': props.inline,
            '-error': hasError.value,
            '-required': props.required // @TODO Add required state based on required validator this.input.schema?.validators.some(v => v.name === 'required')
        }));

        provide(FormGroupKey, {
            disabled: isDisabled,
            readonly: isReadonly,
            size: resolvedSize,
            color: resolvedColor,
            onBlur,
            onInput
        });

        return {
            classes,
            isDisabled,
            isReadonly,
            resolvedSize,
            resolvedColor,
            onBlur,
            onInput
        };
    }
});
</script>

<template>
    <fieldset v-bind="$attrs" class="form-group" :class="classes" :name="name" role="group">
        <!-- @slot default Slot for default form group content -->
        <slot />
    </fieldset>
</template>
