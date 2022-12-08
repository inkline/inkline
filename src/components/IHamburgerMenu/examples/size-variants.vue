<script>
export default {
    data() {
        return {
            active: false
        };
    }
};
</script>
<template>
    <i-hamburger-menu v-model="active" size="sm" />
    <i-hamburger-menu v-model="active" size="md" />
    <i-hamburger-menu v-model="active" size="lg" />
</template>
