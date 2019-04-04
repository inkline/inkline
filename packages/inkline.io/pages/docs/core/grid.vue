<template lang="md" src="./grid.md"></template>

<script>
import View from '@components/View';
import {title} from '@helpers/title';
import GridBox from '@components/GridBox';

export default {
    name: 'GridView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Grid')
    },
    components: {
        GridBox
    }
};
</script>
