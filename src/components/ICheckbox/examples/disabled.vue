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
    <i-checkbox v-model="unchecked" disabled>Unchecked</i-checkbox>

    <i-checkbox v-model="checked" disabled>Checked</i-checkbox>
</template>
