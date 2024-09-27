<script>
export default {
    data() {
        return {
            sm: false,
            md: false,
            lg: false
        };
    }
};
</script>
<template>
    <IButton @click="sm = true"> Show Small Modal </IButton>

    <IModal v-model="sm" size="sm">
        <template #header> Small Modal </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>

    <IButton @click="md = true"> Show Medium Modal </IButton>

    <IModal v-model="md" size="md">
        <template #header> Medium Modal </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>

    <IButton @click="lg = true"> Show Large Modal </IButton>

    <IModal v-model="lg" size="lg">
        <template #header> Large Modal </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>
</template>
