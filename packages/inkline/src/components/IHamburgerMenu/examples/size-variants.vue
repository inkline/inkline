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
    <IHamburgerMenu v-model="active" size="sm" />
    <IHamburgerMenu v-model="active" size="md" />
    <IHamburgerMenu v-model="active" size="lg" />
</template>
