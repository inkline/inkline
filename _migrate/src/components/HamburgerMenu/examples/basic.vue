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
    <HamburgerMenu v-model="active" />
</template>
