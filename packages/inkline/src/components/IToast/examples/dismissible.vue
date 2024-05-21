<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(true);
</script>

<template>
    <IToast v-if="visible" v-model="visible" dismissible>
        <p>Whoa! This toast can be dismissed.</p>
    </IToast>
</template>
