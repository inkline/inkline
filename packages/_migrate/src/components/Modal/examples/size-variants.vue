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
    <Button @click="sm = true"> Show Small Modal </Button>

    <Modal v-model="sm" size="sm">
        <template #header> Small Modal </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </Modal>

    <Button @click="md = true"> Show Medium Modal </Button>

    <Modal v-model="md" size="md">
        <template #header> Medium Modal </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </Modal>

    <Button @click="lg = true"> Show Large Modal </Button>

    <Modal v-model="lg" size="lg">
        <template #header> Large Modal </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </Modal>
</template>
