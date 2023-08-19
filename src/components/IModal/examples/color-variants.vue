<script>
export default {
    data() {
        return {
            primary: false,
            secondary: false,
            light: false,
            dark: false,
            info: false,
            success: false,
            warning: false,
            danger: false
        };
    }
};
</script>
<template>
    <IButton color="primary" @click="primary = true"> Show Primary Modal </IButton>

    <IModal v-model="primary" color="primary">
        <template #header> Primary Modal </template>
        <template #icon>
            <IIcon name="ink-check" size="lg" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>

    <IButton color="secondary" @click="secondary = true"> Show Secondary Modal </IButton>

    <IModal v-model="secondary" color="secondary">
        <template #header> Secondary Modal </template>
        <template #icon>
            <IIcon name="ink-check" size="lg" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>

    <IButton color="light" @click="light = true"> Show Light Modal </IButton>

    <IModal v-model="light" color="light">
        <template #header> Light Modal </template>
        <template #icon>
            <IIcon name="ink-check" size="lg" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>

    <IButton color="dark" @click="dark = true"> Show Dark Modal </IButton>

    <IModal v-model="dark" color="dark">
        <template #header> Dark Modal </template>
        <template #icon>
            <IIcon name="ink-check" size="lg" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>

    <IButton color="info" @click="info = true"> Show Info Modal </IButton>

    <IModal v-model="info" color="info">
        <template #header> Info Modal </template>
        <template #icon>
            <IIcon name="ink-info" size="lg" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>

    <IButton color="success" @click="success = true"> Show Success Modal </IButton>

    <IModal v-model="success" color="success">
        <template #header> Success Modal </template>
        <template #icon>
            <IIcon name="ink-check" size="lg" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>

    <IButton color="warning" @click="warning = true"> Show Warning Modal </IButton>

    <IModal v-model="warning" color="warning">
        <template #header> Warning Modal </template>
        <template #icon>
            <IIcon name="ink-warning" size="lg" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>

    <IButton color="danger" @click="danger = true"> Show Danger Modal </IButton>

    <IModal v-model="danger" color="danger">
        <template #header> Danger Modal </template>
        <template #icon>
            <IIcon name="ink-danger" size="lg" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </IModal>
</template>
