<script lang="ts">
export default {
    data() {
        return {
            unchecked: false,
            checked: true
        };
    }
};
</script>

<template>
    <ICheckbox v-model="unchecked" disabled>Unchecked</ICheckbox>

    <ICheckbox v-model="checked" disabled>Checked</ICheckbox>
</template>
