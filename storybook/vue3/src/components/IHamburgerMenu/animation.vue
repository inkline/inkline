<script lang="ts">
import { IHamburgerMenu } from '@inkline/inkline/components';

export default {
    components: {
        IHamburgerMenu
    }
};
</script>
<template>
    <i-hamburger-menu animation="close" v-model="active" />
    
    <i-hamburger-menu animation="arrow-up" v-model="active" />
    
    <i-hamburger-menu animation="arrow-down" v-model="active" />
    
    <i-hamburger-menu animation="arrow-left" v-model="active" />
    
    <i-hamburger-menu animation="arrow-right" v-model="active" />
    
    <i-hamburger-menu animation="minus" v-model="active" />
    
    <i-hamburger-menu animation="plus" v-model="active" />
</template>
<script src="./animation.demo.js" />
