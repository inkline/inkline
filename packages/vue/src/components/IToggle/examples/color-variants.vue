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
    <IToggle v-model="toggled" color="light">I accept the terms and conditions</IToggle>

    <IToggle v-model="toggled" color="dark">I accept the terms and conditions</IToggle>
</template>
