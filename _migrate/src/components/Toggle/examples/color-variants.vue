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
    <Toggle v-model="toggled" color="light">I accept the terms and conditions</Toggle>

    <Toggle v-model="toggled" color="dark">I accept the terms and conditions</Toggle>
</template>
