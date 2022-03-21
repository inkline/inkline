<script lang="ts">
import { INumberInput } from '@inkline/inkline/components';

export default {
    components: {
        INumberInput
    }
};
</script>
<template>
    <i-number-input v-model="value" placeholder="Enter a number..">
        <template #prepend>
            <i-button>Button</i-button>
        </template>
    </i-number-input>
    
    <i-number-input v-model="value" placeholder="Enter a number..">
        <template #append>
            <i-button>Button</i-button>
        </template>
    </i-number-input>
    
    <i-number-input v-model="value" placeholder="Enter a number..">
        <template #prepend>
            <i-button>Button</i-button>
        </template>
        <template #append>
            <i-button>Button</i-button>
        </template>
    </i-number-input>
</template>
<script src="./prepend-append-button.demo.js" />
