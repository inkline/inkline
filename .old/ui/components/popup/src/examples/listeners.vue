<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <Popup listener="click">
        <template #trigger="{ props }">
            <Button v-bind="props">Click Event</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Click Event Popup</div>
        </template>
    </Popup>

    <Popup listener="hover">
        <template #trigger="{ props }">
            <Button v-bind="props">Hover Event</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Hover Event Popup</div>
        </template>
    </Popup>

    <Popup listener="focus">
        <template #trigger="{ props }">
            <Button v-bind="props">Focus Event</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Focus Event Popup</div>
        </template>
    </Popup>

    <Popup :listener="['focus', 'hover']">
        <template #trigger="{ props }">
            <Button v-bind="props">Multiple listeners</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Multiple listeners Popup</div>
        </template>
    </Popup>

    <Popup listener="manual" v-model:visible="visible">
        <template #trigger="{ props }">
            <Button v-bind="props" @click="visible = !visible">Manual Event</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Manual Event Popup</div>
        </template>
    </Popup>
</template>
