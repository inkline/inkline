<template lang="md" src="./form-group.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IFormGroup, IFormLabel, ICheckbox, ICheckboxGroup, IRadio, IRadioGroup, IInput, ISelect, ISelectOption, ITextarea, IButton } from "@inkline/inkline/src/components";

export default {
    extends: View,
    name: 'FormGroupView',
    layout: 'documentation',
    head: head('docs-forms-form-group'),
    components: {
        IFormGroup,
        IFormLabel,
        ICheckbox,
        IRadio,
        IInput,
        ISelect,
        ISelectOption,
        ITextarea,
        IButton,
        ICheckboxGroup,
        IRadioGroup
    },
    data () {
        return {
            input: '',
            textarea: '',
            select: '',
            checkbox: ['Football'],
            radio: 'Decline',
            inputDisabled: '',
            textareaDisabled: '',
            selectDisabled: '',
            checkboxDisabled: ['Football'],
            radioDisabled: 'Decline',
            inputSizeSm: '',
            textareaSizeSm: '',
            selectSizeSm: '',
            checkboxSizeSm: ['Football'],
            radioSizeSm: 'Decline',
            inputSizeMd: '',
            textareaSizeMd: '',
            selectSizeMd: '',
            checkboxSizeMd: ['Football'],
            radioSizeMd: 'Decline',
            inputSizeLg: '',
            textareaSizeLg: '',
            selectSizeLg: '',
            checkboxSizeLg: ['Football'],
            radioSizeLg: 'Decline',
            inputNested: '',
            passwordNested: '',
            textareaNested: '',
            selectNested: '',
            checkboxNested: ['Football'],
            radioNested: 'Decline',
        };
    }
};
</script>
