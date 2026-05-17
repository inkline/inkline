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
    <HamburgerMenu v-model="active" animation="close" />
    <HamburgerMenu v-model="active" animation="arrow-up" />
    <HamburgerMenu v-model="active" animation="arrow-down" />
    <HamburgerMenu v-model="active" animation="arrow-left" />
    <HamburgerMenu v-model="active" animation="arrow-right" />
    <HamburgerMenu v-model="active" animation="minus" />
    <HamburgerMenu v-model="active" animation="plus" />
</template>
