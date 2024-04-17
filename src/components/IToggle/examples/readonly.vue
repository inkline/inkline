<script>
export default {
    data() {
        return {
            readonlyFalse: false,
            readonlyTrue: true
        };
    }
};
</script>
<template>
    <IToggle v-model="readonlyFalse" readonly>I accept the terms and conditions</IToggle>

    <IToggle v-model="readonlyTrue" readonly>I accept the terms and conditions</IToggle>
</template>
