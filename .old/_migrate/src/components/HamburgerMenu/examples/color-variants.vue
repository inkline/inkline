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
    <HamburgerMenu v-model="active" color="light" />
    <HamburgerMenu v-model="active" color="dark" />
</template>
