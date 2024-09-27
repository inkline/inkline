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
    <IButton @click="visible = true"> Show Fullscreen Modal </IButton>

    <IModal v-model="visible" fullscreen>
        <template #header> Modal Header </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>
</template>
