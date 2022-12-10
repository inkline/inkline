<script>
export default {
    data() {
        return {
            visible: false
        };
    }
};
</script>
<template>
    <i-button @click="visible = true"> Show Modal </i-button>

    <i-modal v-model="visible">
        <template #header> Modal Header </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </i-modal>
</template>
