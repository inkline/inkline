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
    <i-toggle v-model="toggled" disabled>I accept the terms and conditions</i-toggle>
</template>
