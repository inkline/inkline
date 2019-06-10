<template lang="md" src="./select.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    extends: View,
    name: 'SelectView',
    layout: 'documentation',
    head: head({
        title: 'Select',
        description: 'Select inputs are form components used for providing a collapsible list of options.'
    }),
    data () {
        return {
            selectValue: '',
            disabledSelectValue: '',
            clearableSelectValue: '',
            prefixSelectValue: '',
            suffixSelectValue: '',
            prefixSuffixSelectValue: '',
            prependSelectValue: '',
            appendSelectValue: '',
            prependAppendSelectValue: '',
            smSelectValue: '',
            mdSelectValue: '',
            lgSelectValue: '',
            labelDefaultSelectValue: '',
            labelLeftSelectValue: '',
            labelRightSelectValue: ''
        };
    }
};
</script>
