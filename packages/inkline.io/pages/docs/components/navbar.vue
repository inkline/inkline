<template lang="md" src="./navbar.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'NavbarView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Navbar',
        description: 'A responsive navigation header that includes support for branding, navigation, forms and more.'
    }),
};
</script>
