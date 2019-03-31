<template lang="md" src="./grid.md"></template>

<script>
import View from '@components/View';
import GridBox from '@components/GridBox';

export default {
    name: 'GridView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Grid'
    },
    components: {
        GridBox
    }
};
</script>
