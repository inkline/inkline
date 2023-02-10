<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(true);
const duration = ref(5000);
</script>

<template>
    <IToast v-if="visible" v-model="visible" color="light" :duration="duration" dismissible>
        <p>Whoa! This toast automatically disappears after 5 seconds.</p>
    </IToast>
    <IToast v-if="visible" v-model="visible" color="dark" :duration="duration" dismissible>
        <p>Whoa! This toast automatically disappears after 5 seconds.</p>
    </IToast>
    <IToast v-if="visible" v-model="visible" color="info" :duration="duration" dismissible>
        <p>Whoa! This toast automatically disappears after 5 seconds.</p>
    </IToast>
    <IToast v-if="visible" v-model="visible" color="success" :duration="duration" dismissible>
        <p>Whoa! This toast automatically disappears after 5 seconds.</p>
    </IToast>
    <IToast v-if="visible" v-model="visible" color="warning" :duration="duration" dismissible>
        <p>Whoa! This toast automatically disappears after 5 seconds.</p>
    </IToast>
    <IToast v-if="visible" v-model="visible" color="danger" :duration="duration" dismissible>
        <p>Whoa! This toast automatically disappears after 5 seconds.</p>
    </IToast>
</template>
