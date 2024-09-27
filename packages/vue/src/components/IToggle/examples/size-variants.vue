<script>
export default {
    data() {
        return {
            toggled: false
        };
    }
};
</script>
<template>
    <IToggle v-model="toggled" size="sm">I accept the terms and conditions</IToggle>

    <IToggle v-model="toggled" size="md">I accept the terms and conditions</IToggle>

    <IToggle v-model="toggled" size="lg">I accept the terms and conditions</IToggle>
</template>
