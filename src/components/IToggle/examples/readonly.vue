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
    <i-toggle v-model="toggled" readonly>I accept the terms and conditions</i-toggle>
</template>
