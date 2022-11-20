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
    <i-hamburger-menu size="sm" v-model="active" />
    
    <i-hamburger-menu size="md" v-model="active" />
    
    <i-hamburger-menu size="lg" v-model="active" />
</template>
