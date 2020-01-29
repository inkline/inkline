<template lang="md" src="./introduction.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IForm, IFormGroup, IFormLabel, IInput, ITextarea, ICheckbox, ICheckboxGroup, IRadio, IRadioGroup } from '@inkline/inkline';

export default {
    extends: View,
    name: 'FormValidationIntroductionView',
    layout: 'documentation',
    head: head('docs-forms-validation-introduction'),
};
</script>
