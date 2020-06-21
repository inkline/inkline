<template lang="md" src="./form-label.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    extends: View,
    name: 'FormLabelView',
    data () {
        return {
            labelInputValue: '',
            labelDefaultInputValue: '',
            labelLeftInputValue: '',
            labelRightInputValue: '',
            labelSmInputValue: '',
            labelMdInputValue: '',
            labelLgInputValue: ''
        };
    }
};
</script>
