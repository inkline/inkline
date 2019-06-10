<template lang="md" src="./input.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    extends: View,
    name: 'InputView',
    layout: 'documentation',
    head: head({
        title: 'Input',
        description: 'Inputs are form components used for inputting data directly from the keyboard.'
    }),
    data () {
        return {
            inputValue: '',
            disabledInputValue: '',
            clearableInputValue: '',
            prefixInputValue: '',
            suffixInputValue: '',
            prefixSuffixInputValue: '',
            prependInputValue: '',
            appendInputValue: '',
            prependAppendInputValue: '',
            smInputValue: '',
            mdInputValue: '',
            lgInputValue: '',
            labelDefaultInputValue: '',
            labelLeftInputValue: '',
            labelRightInputValue: ''
        };
    }
};
</script>
