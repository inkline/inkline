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
    <IButton @click="visible = true"> Show Modal with Icon </IButton>

    <IModal v-model="visible">
        <template #header> Modal Header </template>
        <template #icon>
            <IIcon name="ink-info" size="xl" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>
</template>
