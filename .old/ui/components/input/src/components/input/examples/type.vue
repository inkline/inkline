<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Input v-model="value" type="text" placeholder="Enter some text.." />

    <Input v-model="value" type="password" placeholder="Enter a password.." />

    <Input v-model="value" type="date" placeholder="Enter a date.." />

    <Input v-model="value" type="email" placeholder="Enter an email.." />

    <Input v-model="value" type="number" placeholder="Enter a number.." />
</template>
