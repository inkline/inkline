<script lang="ts">
import { defineComponent } from 'vue';
import { Input } from '@inkline/inkline/components/Input';
import { uid } from '@inkline/utils';

const componentName = 'Textarea';

export default defineComponent({
    name: componentName,
    components: {
        Input
    },
    inheritAttrs: true,
    props: {
        ...Input.props,
        /**
         * The unique identifier of the textarea
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default: () => {
                return uid('textarea');
            }
        }
    },
    emits: Input.emits,
    setup(_props, { emit }) {
        function onUpdateModelValue(value: string) {
            emit('update:modelValue', value);
        }

        return {
            onUpdateModelValue
        };
    }
});
</script>

<template>
    <Input
        v-bind="{ ...$attrs, ...$props }"
        type="textarea"
        @update:model-value="onUpdateModelValue"
    >
        <template v-if="$slots.prepend" #prepend>
            <slot name="prepend" />
        </template>
        <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
        </template>
        <template v-if="$slots.clearable" #clearable>
            <slot name="clearable" />
        </template>
        <template v-if="$slots.suffix" #suffix>
            <slot name="suffix" />
        </template>
        <template v-if="$slots.append" #append>
            <slot name="append" />
        </template>
    </Input>
</template>
