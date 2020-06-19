<template lang="md" src="./navbar.md" />
<script>
import View from '~/components/docs/View';

export default {
    name: 'NavbarView',
    extends: View,
    data() {
        return {
            collapsed: false
        };
    }
};
</script>
