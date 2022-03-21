<script lang="ts">
import { IInput } from '@inkline/inkline/components';

export default {
    components: {
        IInput
    }
};
</script>
<template>
    <i-input v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
    </i-input>
    
    <i-input v-model="value" placeholder="Type something..">
        <template #suffix>@</template>
    </i-input>
    
    <i-input v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
        <template #suffix>@</template>
    </i-input>
</template>
<script src="./prefix-suffix.demo.js" />
