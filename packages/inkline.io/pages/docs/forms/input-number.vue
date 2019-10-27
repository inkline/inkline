<template lang="md" src="./input-number.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IInputNumber, IFormGroup } from "@inkline/inkline/src/components";

export default {
    extends: View,
    name: 'InputView',
    layout: 'documentation',
    head: head('docs-forms-input-number'),
    components: {
        IInputNumber,
        IFormGroup
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
