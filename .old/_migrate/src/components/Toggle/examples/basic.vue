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
    <Toggle v-model="toggled">I accept the terms and conditions</Toggle>
</template>
