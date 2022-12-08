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
    <i-hamburger-menu v-model="active" animation="close" />
    <i-hamburger-menu v-model="active" animation="arrow-up" />
    <i-hamburger-menu v-model="active" animation="arrow-down" />
    <i-hamburger-menu v-model="active" animation="arrow-left" />
    <i-hamburger-menu v-model="active" animation="arrow-right" />
    <i-hamburger-menu v-model="active" animation="minus" />
    <i-hamburger-menu v-model="active" animation="plus" />
</template>
