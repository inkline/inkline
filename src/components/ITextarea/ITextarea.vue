<script lang="ts">
import { defineComponent } from 'vue';
import { IInput } from '@inkline/inkline/components/IInput';

const componentName = 'ITextarea';

export default defineComponent({
    name: componentName,
    components: {
        IInput
    },
    emits: IInput.emits
});
</script>

<template>
    <IInput v-bind="{ ...$attrs, ...$props }" type="textarea">
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
