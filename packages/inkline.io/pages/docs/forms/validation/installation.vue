<template lang="md" src="./installation.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IForm, IFormGroup, IFormLabel, IInput, ITextarea, ICheckbox, ICheckboxGroup, IRadio, IRadioGroup } from '@inkline/inkline';

export default {
    extends: View,
    name: 'FormValidationInstallationView',
    layout: 'documentation',
    head: {
        title: title('Installation - Form Validation')
    }
};
</script>
