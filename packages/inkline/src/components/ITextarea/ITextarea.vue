<script lang="ts">
import { defineComponent } from 'vue';
import { IInput } from '@inkline/inkline/components/IInput';
import { uid } from '@inkline/utils';

const componentName = 'ITextarea';

export default defineComponent({
    name: componentName,
    components: {
        IInput
    },
    inheritAttrs: true,
    props: {
        ...IInput.props,
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
    emits: IInput.emits,
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
    <IInput
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
    </IInput>
</template>
