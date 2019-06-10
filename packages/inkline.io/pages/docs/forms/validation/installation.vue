<template lang="md" src="./installation.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";
import { IForm, IFormGroup, IFormLabel, IInput, ITextarea, ICheckbox, ICheckboxGroup, IRadio, IRadioGroup } from '@inkline/inkline';

export default {
    extends: View,
    name: 'FormValidationInstallationView',
    layout: 'documentation',
    head: head({
        title: 'Installation - Form Validation',
        description: 'Install and take advantage of the powerful form validation utilities provided by Inkline.'
    }),
};
</script>
