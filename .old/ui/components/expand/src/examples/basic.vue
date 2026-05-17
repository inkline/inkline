<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
<template>
    <button @click="visible = !visible">Expand</button>

    <Expand axis="x">
        <div v-show="visible" class="expand">
            <div style="width: 200px; height: 200px; background: var(--color-primary)" />
        </div>
    </Expand>

    <Expand axis="y">
        <div v-show="visible" class="expand">
            <div style="width: 200px; height: 200px; background: var(--color-secondary)" />
        </div>
    </Expand>
</template>
