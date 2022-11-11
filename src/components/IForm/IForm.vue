<script lang="ts" setup>
import {computed, provide} from 'vue';
import { useComponentColor, useComponentSize, useValidation , useFormState } from '@inkline/inkline/composables';
import { uid } from '@grozav/utils';
import {FormKey} from "@inkline/inkline/components/IForm/mixin";

const componentName = 'IForm';

const props = defineProps({
    /**
     * The color variant of the form
     * @type light | dark
     * @default light
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
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: undefined
    }
});

const emit = defineEmits([
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
]);

const componentSize = useComponentSize({ componentName, currentSize: props.size });
const componentColor = useComponentColor({ componentName, currentColor: props.color });

const { disabled, readonly, size } = useFormState({
    disabled: props.disabled,
    readonly: props.readonly,
    size: componentSize.value
});

const { schema, onBlur, onInput, onSubmit: schemaOnSubmit } = useValidation({
    schema: props.modelValue,
    onUpdate: (model: any) => {
        emit('update:modelValue', model)
    },
    onSubmit: (event: SubmitEvent) => {
        emit('submit', event);
    }
});

const classes = computed(() => ({
    [`-${size}`]: true,
    [`-${componentColor}`]: true,
    '-disabled': disabled.value,
    '-readonly': readonly.value,
    '-inline': props.inline
}));

function onSubmit(event: SubmitEvent) {
    if (props.modelValue) {
        schemaOnSubmit(event);
    } else {
        emit('submit', event);
    }
}

provide(FormKey, {
    onBlur,
    onInput,
    schema,
});
</script>

<script lang="ts">
export default {
    inheritAttrs: false
};
</script>

<template>
    <form
        class="form"
        :class="classes"
        role="form"
        :name="name"
        :readonly="disabled"
        :disabled="readonly"
        @submit.prevent="onSubmit"
    >
        <pre
        >{{ schema }}
        </pre>
        <!--** Slot for form content -->
        <slot />
    </form>
</template>
