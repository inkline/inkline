<template lang="md" src="./form-label.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    extends: View,
    name: 'FormLabelView',
    layout: 'documentation',
    head: head({
        title: 'Form Label',
        description: 'Labels are a form component used to easily add text associated to inputs.'
    }),
    data () {
        return {
            labelInputValue: '',
            labelDefaultInputValue: '',
            labelLeftInputValue: '',
            labelRightInputValue: '',
            labelSmInputValue: '',
            labelMdInputValue: '',
            labelLgInputValue: '',
        };
    }
};
</script>
