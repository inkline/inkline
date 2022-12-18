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
    <i-hamburger-menu v-model="active" color="light" />
    <i-hamburger-menu v-model="active" color="dark" />
</template>
