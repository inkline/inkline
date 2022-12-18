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
    <IHamburgerMenu v-model="active" animation="close" />
    <IHamburgerMenu v-model="active" animation="arrow-up" />
    <IHamburgerMenu v-model="active" animation="arrow-down" />
    <IHamburgerMenu v-model="active" animation="arrow-left" />
    <IHamburgerMenu v-model="active" animation="arrow-right" />
    <IHamburgerMenu v-model="active" animation="minus" />
    <IHamburgerMenu v-model="active" animation="plus" />
</template>
