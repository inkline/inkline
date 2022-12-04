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
    <i-button color="primary" @click="primary = true"> Show Primary Modal </i-button>

    <i-modal v-model="primary" color="primary">
        <template #header> Primary Modal </template>
        <div class="_display:flex _align-items:center">
            <i-icon name="ink-check" class="font-size:lg _margin-y:0 _margin-right:1" />
            This is the modal body. Useful information goes here.
        </div>
        <template #footer> Modal Footer </template>
    </i-modal>

    <i-button color="secondary" @click="secondary = true"> Show Secondary Modal </i-button>

    <i-modal v-model="secondary" color="secondary">
        <template #header> Secondary Modal </template>
        <div class="_display:flex _align-items:center">
            <i-icon name="ink-check" class="font-size:lg _margin-y:0 _margin-right:1" />
            This is the modal body. Useful information goes here.
        </div>
        <template #footer> Modal Footer </template>
    </i-modal>

    <i-button color="light" @click="light = true"> Show Light Modal </i-button>

    <i-modal v-model="light" color="light">
        <template #header> Light Modal </template>
        <div class="_display:flex _align-items:center">
            <i-icon name="ink-check" class="font-size:lg _margin-y:0 _margin-right:1" />
            This is the modal body. Useful information goes here.
        </div>
        <template #footer> Modal Footer </template>
    </i-modal>

    <i-button color="dark" @click="dark = true"> Show Dark Modal </i-button>

    <i-modal v-model="dark" color="dark">
        <template #header> Dark Modal </template>
        <div class="_display:flex _align-items:center">
            <i-icon name="ink-check" class="font-size:lg _margin-y:0 _margin-right:1" />
            This is the modal body. Useful information goes here.
        </div>
        <template #footer> Modal Footer </template>
    </i-modal>

    <i-button color="info" @click="info = true"> Show Info Modal </i-button>

    <i-modal v-model="info" color="info">
        <template #header> Info Modal </template>
        <div class="_display:flex _align-items:center">
            <i-icon name="ink-info" class="font-size:lg _margin-y:0 _margin-right:1" />
            This is the modal body. Useful information goes here.
        </div>
        <template #footer> Modal Footer </template>
    </i-modal>

    <i-button color="success" @click="success = true"> Show Success Modal </i-button>

    <i-modal v-model="success" color="success">
        <template #header> Success Modal </template>
        <div class="_display:flex _align-items:center">
            <i-icon name="ink-check" class="font-size:lg _margin-y:0 _margin-right:1" />
            This is the modal body. Useful information goes here.
        </div>
        <template #footer> Modal Footer </template>
    </i-modal>

    <i-button color="warning" @click="warning = true"> Show Warning Modal </i-button>

    <i-modal v-model="warning" color="warning">
        <template #header> Warning Modal </template>
        <div class="_display:flex _align-items:center">
            <i-icon name="ink-warning" class="font-size:lg _margin-y:0 _margin-right:1" />
            This is the modal body. Useful information goes here.
        </div>
        <template #footer> Modal Footer </template>
    </i-modal>

    <i-button color="danger" @click="danger = true"> Show Danger Modal </i-button>

    <i-modal v-model="danger" color="danger">
        <template #header> Danger Modal </template>
        <div class="_display:flex _align-items:center">
            <i-icon name="ink-danger" class="font-size:lg _margin-y:0 _margin-right:1" />
            This is the modal body. Useful information goes here.
        </div>
        <template #footer> Modal Footer </template>
    </i-modal>
</template>
