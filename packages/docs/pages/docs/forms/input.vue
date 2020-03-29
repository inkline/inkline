<template lang="md" src="./input.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IInput, IFormGroup, IButton, IDropdown, IDropdownMenu, IDropdownItem, IDropdownDivider } from "@inkline/inkline/src/components";

export default {
    extends: View,
    name: 'InputView',
    layout: 'documentation',
    head: head('docs-forms-input'),
    components: {
        IInput,
        IFormGroup,
        IButton,
        IDropdown,
        IDropdownMenu,
        IDropdownItem,
        IDropdownDivider
    },
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
