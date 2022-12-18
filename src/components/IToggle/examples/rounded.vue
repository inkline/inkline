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
    <i-toggle v-model="toggled" rounded>I accept the terms and conditions</i-toggle>
</template>
