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
    <IToggle v-model="toggled">I accept the terms and conditions</IToggle>
</template>
