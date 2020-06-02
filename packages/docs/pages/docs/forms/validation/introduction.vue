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
                title: {
                    validators: [
                        { rule: 'required', message: 'Please provide a project title.' }
                    ]
                },
                description: {
                    validators: [
                        { rule: 'required', message: 'Please write a project description.' }
                    ]
                },
                details: {
                    type: {
                        value: 'a',
                        validators: [
                            { rule: 'required', message: 'The project type is required.' }
                        ]
                    },
                    labels: {
                        value: ['Design', 'Testing'],
                        validators: [
                            { rule: 'minLength', value: 2, message: 'At least two labels are required.' }
                        ]
                    },
                    published: {
                        value: true,
                        validators: [
                            { rule: 'required', message: 'Publishing is required.', invalidateFalse: true }
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
