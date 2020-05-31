<template lang="md" src="./introduction.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert, IForm, IFormGroup, IFormLabel, ICheckbox, ICheckboxGroup, IRadio, IRadioGroup, IInput, ISelect, ISelectOption, ITextarea, IButton } from "@inkline/inkline/src/components";

export default {
    extends: View,
    name: 'FormValidationIntroductionView',
    layout: 'documentation',
    head: head(),
    components: {
        IAlert,
        IForm,
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
    data() {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'required', message: 'Input is required.' }
                    ]
                },
                textarea: {
                    validators: [
                        { rule: 'required', message: 'Textarea is required.' }
                    ]
                },
                group: {
                    select: {
                        value: 'a',
                        validators: [
                            { rule: 'required', message: 'Select is required.' }
                        ]
                    },
                    checked: {
                        value: true,
                        validators: [
                            { rule: 'required', message: 'Checkbox is required.', invalidateFalse: true }
                        ]
                    },
                    checkbox: {
                        value: ['Football'],
                        validators: [
                            { rule: 'minLength', value: 1, message: 'At least one checkbox is required.' }
                        ]
                    },
                    radio: {
                        value: true,
                        validators: [
                            { rule: 'required', message: 'Radio is required.', invalidateFalse: true }
                        ]
                    }
                }
            })
        }
    },
    methods: {
        submitForm() {
            alert('Form submitted!')
        }
    },
    filters: {
        prettify (value) {
            return JSON.stringify(value, null, 2);
        }
    }
};
</script>
