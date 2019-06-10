<template lang="md" src="./input-number.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    extends: View,
    name: 'InputView',
    layout: 'documentation',
    head: head({
        title: 'Number Input',
        description: 'Number Inputs are form components used to for inputting and manipulating numbers.'
    }),
    data () {
        return {
            inputValue: '',
            disabledInputValue: '',
            minMaxInputValue: '1',
            stepInputValue: '',
            precisionInputValue: '',
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
