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
    <HamburgerMenu v-model="active" size="sm" />
    <HamburgerMenu v-model="active" size="md" />
    <HamburgerMenu v-model="active" size="lg" />
</template>
