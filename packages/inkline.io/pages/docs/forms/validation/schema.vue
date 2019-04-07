<template lang="md" src="./schema.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IForm, IFormGroup, IFormLabel, IInput, ITextarea, ICheckbox, ICheckboxGroup, IRadio, IRadioGroup } from '@inkline/inkline';

export default {
    extends: View,
    name: 'FormValidationSchemaView',
    layout: 'documentation',
    head: {
        title: title('Schema - Form Validation')
    },
    components: {
        IForm,
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
            basicForm: this.$form({
                input: {
                    value: 'John Doe',
                    validators: [
                        { rule: 'required' }
                    ]
                }
            }),
            defaultValueForm: this.$form({
                input: {
                    value: 'Default Value'
                }
            }),
            validateValueForm: this.$form({
                input: {
                    validators: [
                        { rule: 'required', message: 'Input is required' }
                    ]
                }
            }),
            validateOnForm: this.$form({
                input1: {
                    validateOn: 'input',
                    validators: [
                        { rule: 'minLength', value: 6 }
                    ]
                },
                input2: {
                    validateOn: 'blur',
                    validators: [
                        { rule: 'minLength', value: 6 }
                    ]
                }
            }),
            groupedValueForm: this.$form({
                input: {},
                group: {
                    input: {}
                }
            }),
            arrayValueForm: this.$form({
                group: [
                    { value: 'First Field' },
                    { value: 'Second Field' }
                ]
            }),
            form: this.$form({
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
        };
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
