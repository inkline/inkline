<template lang="md" src="./form-label.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IInput, IFormGroup, IFormLabel } from "@inkline/inkline/src/components";

export default {
    extends: View,
    name: 'FormLabelView',
    layout: 'documentation',
    head: head('docs-forms-form-label'),
    components: {
        IInput,
        IFormGroup,
        IFormLabel
    },
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
