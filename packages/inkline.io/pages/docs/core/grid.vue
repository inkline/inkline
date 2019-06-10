<template lang="md" src="./grid.md"></template>

<script>
import View from '@components/View';
import { head } from "@helpers/head";
import GridBox from '@components/GridBox';

export default {
    name: 'GridView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Grid',
        description: 'Inkline\'s grid system is modelled as a 12 columns layout built using flexbox, with equally divided columns.'
    }),
    components: {
        GridBox
    }
};
</script>
