<template lang="md" src="./grid.md"></template>
<script>
import View from '~/components/layout/NuxtContentView';
import GridBox from '~/components/docs/GridBox';

export default {
    name: 'GridView',
    layout: 'documentation',
    extends: View,
    components: {
        GridBox
    }
};
</script>
