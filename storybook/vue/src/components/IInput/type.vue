<script lang="ts">
import { IInput } from '@inkline/inkline/components';

export default {
    components: {
        IInput
    }
};
</script>
<template>
    <i-input v-model="value" type="text" placeholder="Enter some text.." />
    
    <i-input v-model="value" type="password" placeholder="Enter a password.." />
    
    <i-input v-model="value" type="date" placeholder="Enter a date.." />
    
    <i-input v-model="value" type="email" placeholder="Enter an email.." />
    
    <i-input v-model="value" type="number" placeholder="Enter a number.." />
</template>
<script src="./type.demo.js" />
