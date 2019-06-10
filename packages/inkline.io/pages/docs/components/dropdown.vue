<template lang="md" src="./dropdown.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'DropdownView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Dropdown',
        description: 'Dropdowns are contextual overlays toggled through clicking or hovering, used for displaying a list of links.'
    }),
};
</script>
