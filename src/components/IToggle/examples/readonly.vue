<script>
export default {
    data() {
        return {
            toggled: true
        };
    }
};
</script>
<template>
    <IToggle v-model="toggled" readonly>I accept the terms and conditions</IToggle>
</template>
