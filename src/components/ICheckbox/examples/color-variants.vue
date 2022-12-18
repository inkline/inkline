<script lang="ts">
export default {
    data() {
        return {
            light: false,
            dark: false
        };
    }
};
</script>

<template>
    <div>
        <div
            class="_background:white _display:flex _align-items:center _padding:1"
            style="height: 50px"
        >
            <ICheckbox v-model="light" color="light">Light</ICheckbox>
        </div>

        <div
            class="_background:gray-90 _display:flex _align-items:center _padding:1"
            style="height: 50px"
        >
            <ICheckbox v-model="dark" color="dark">Dark</ICheckbox>
        </div>
    </div>
</template>
