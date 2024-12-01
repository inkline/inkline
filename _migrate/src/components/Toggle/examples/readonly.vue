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
    <Toggle v-model="readonlyFalse" readonly>I accept the terms and conditions</Toggle>

    <Toggle v-model="readonlyTrue" readonly>I accept the terms and conditions</Toggle>
</template>
