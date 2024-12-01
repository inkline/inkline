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
    <Toggle v-model="toggled" size="sm">I accept the terms and conditions</Toggle>

    <Toggle v-model="toggled" size="md">I accept the terms and conditions</Toggle>

    <Toggle v-model="toggled" size="lg">I accept the terms and conditions</Toggle>
</template>
