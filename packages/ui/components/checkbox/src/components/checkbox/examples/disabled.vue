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
    <Checkbox v-model="unchecked" disabled>Unchecked</Checkbox>

    <Checkbox v-model="checked" disabled>Checked</Checkbox>
</template>
