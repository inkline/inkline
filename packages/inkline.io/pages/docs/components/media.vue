<template lang="md" src="./media.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IMedia } from '@inkline/inkline';

export default {
    name: 'CardView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Media')
    },
    components: {
        IMedia
    }
};
</script>
