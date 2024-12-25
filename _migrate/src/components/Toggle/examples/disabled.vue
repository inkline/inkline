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
    <Toggle v-model="disabledFalse" disabled>I accept the terms and conditions</Toggle>

    <Toggle v-model="disabledTrue" disabled>I accept the terms and conditions</Toggle>
</template>
