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
        <template #prepend>
            <i-button>Button</i-button>
        </template>
    </i-textarea>
    
    <i-textarea v-model="value" placeholder="Type something..">
        <template #append>
            <i-button>Button</i-button>
        </template>
    </i-textarea>
    
    <i-textarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <i-button>Button</i-button>
        </template>
        <template #append>
            <i-button>Button</i-button>
        </template>
    </i-textarea>
</template>
<script src="./prepend-append-button.demo.js" />
