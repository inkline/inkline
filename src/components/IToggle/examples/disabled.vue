<script>
export default {
    data() {
        return {
            disabledFalse: false,
            disabledTrue: true
        };
    }
};
</script>
<template>
    <IToggle v-model="disabledFalse" disabled>I accept the terms and conditions</IToggle>

    <IToggle v-model="disabledTrue" disabled>I accept the terms and conditions</IToggle>
</template>
