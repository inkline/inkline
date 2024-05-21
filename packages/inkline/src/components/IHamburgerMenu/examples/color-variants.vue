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
    <IHamburgerMenu v-model="active" color="light" />
    <IHamburgerMenu v-model="active" color="dark" />
</template>
