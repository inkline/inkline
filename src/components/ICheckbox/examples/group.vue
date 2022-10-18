<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(['apple']);
</script>

<template>
    <i-checkbox-group v-model="checked">
        <i-checkbox value="apple">Apple</i-checkbox>
        <i-checkbox value="banana">Banana</i-checkbox>
        <i-checkbox value="strawberry">Strawberry</i-checkbox>
        <i-checkbox value="mango">Mango</i-checkbox>
    </i-checkbox-group>
    {{ checked }}
</template>
