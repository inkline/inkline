<script lang="ts">
import { IHamburgerMenu } from '@inkline/inkline/components';

export default {
    components: {
        IHamburgerMenu
    }
};
</script>
<template>
    <i-hamburger-menu color="light" v-model="active" />
    
    <i-hamburger-menu color="dark" v-model="active" />
</template>
<script src="./color-variants.demo.js" />
