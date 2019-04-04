<template lang="md" src="./form-label.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IFormGroup, IFormLabel, IInput, ITextarea, ICheckbox, ICheckboxGroup, IRadio, IRadioGroup } from '@inkline/inkline';

export default {
    extends: View,
    name: 'FormLabelView',
    layout: 'documentation',
    head: {
        title: title('Form Label')
    },
    components: {
        IFormGroup,
        IFormLabel,
        IInput,
        ITextarea,
        ICheckbox,
        ICheckboxGroup,
        IRadio,
        IRadioGroup
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
