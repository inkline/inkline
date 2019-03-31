<template lang="md" src="./input-number.md" />
<script>
import View from '@components/View';
import { IInputNumber } from '@inkline/inkline';

export default {
    extends: View,
    name: 'InputView',
    layout: 'documentation',
    head: {
        title: 'Number Input'
    },
    components: {
        IInputNumber
    },
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
