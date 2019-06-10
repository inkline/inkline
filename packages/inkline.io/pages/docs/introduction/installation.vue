<template lang="md" src="./installation.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'InstallationView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Installation',
        description: 'Install Inkline using your favorite package manager and get access to the latest source code.'
    }),
};
</script>
