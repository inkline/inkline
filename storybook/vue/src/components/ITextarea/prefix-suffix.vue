<script lang="ts">
import { ITextarea } from '@inkline/inkline/components';

export default {
    components: {
        ITextarea
    }
};
</script>
<template>
    <i-textarea v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
    </i-textarea>
    
    <i-textarea v-model="value" placeholder="Type something..">
        <template #suffix>@</template>
    </i-textarea>
    
    <i-textarea v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
        <template #suffix>@</template>
    </i-textarea>
</template>
<script src="./prefix-suffix.demo.js" />
