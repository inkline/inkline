<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(true);
</script>

<template>
    <IAlert v-model="visible" dismissible> <p>Whoa! Nicely done.</p> </IAlert>
</template>
