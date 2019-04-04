<template lang="md" src="./installation.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'InstallationView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Installation')
    }
};
</script>
