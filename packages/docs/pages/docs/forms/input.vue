<template lang="md" src="./input.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    extends: View,
    name: 'InputView',
    data () {
        return {
            inputValue: '',
            disabledInputValue: '',
            readonlyInputValue: '',
            clearableInputValue: '',
            prefixInputValue: '',
            suffixInputValue: '',
            prefixSuffixInputValue: '',
            prependInputValue: '',
            appendInputValue: '',
            prependAppendInputValue: '',
            prependButtonInputValue: '',
            appendButtonInputValue: '',
            prependAppendButtonInputValue: '',
            prependDropdownInputValue: '',
            appendDropdownInputValue: '',
            prependAppendDropdownInputValue: '',
            smInputValue: '',
            mdInputValue: '',
            lgInputValue: '',
            passwordInputValue: '',
            labelDefaultInputValue: '',
            labelLeftInputValue: '',
            labelRightInputValue: ''
        };
    }
};
</script>
