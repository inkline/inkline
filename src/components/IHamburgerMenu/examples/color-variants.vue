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
    <i-hamburger-menu color="light" v-model="active" />
    
    <i-hamburger-menu color="dark" v-model="active" />
</template>
