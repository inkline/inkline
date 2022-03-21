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
        <template #prepend>
            <i-button>Button</i-button>
        </template>
    </i-input>
    
    <i-input v-model="value" placeholder="Type something..">
        <template #append>
            <i-button>Button</i-button>
        </template>
    </i-input>
    
    <i-input v-model="value" placeholder="Type something..">
        <template #prepend>
            <i-button>Button</i-button>
        </template>
        <template #append>
            <i-button>Button</i-button>
        </template>
    </i-input>
</template>
<script src="./prepend-append-button.demo.js" />
