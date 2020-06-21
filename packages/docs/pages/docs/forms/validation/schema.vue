<template lang="md" src="./schema.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    extends: View,
    name: 'FormValidationSchemaView',
    data () {
        return {
            basicForm: this.$inkline.form({
                input: {
                    value: 'John Doe',
                    validators: [
                        { rule: 'required' }
                    ]
                }
            }),
            defaultValueForm: this.$inkline.form({
                input: {
                    value: 'Default Value'
                }
            }),
            validateValueForm: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'required', message: 'Input is required' }
                    ]
                }
            }),
            validateOnForm: this.$inkline.form({
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
            groupedValueForm: this.$inkline.form({
                input: {},
                group: {
                    input: {}
                }
            }),
            arrayValueForm: this.$inkline.form({
                group: [
                    { value: 'First Field' },
                    { value: 'Second Field' }
                ]
            }),
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
        };
    },
    methods: {
        submitForm() {
            alert('Form submitted!');
        }
    },
    filters: {
        prettify (value) {
            return JSON.stringify(value, null, 2);
        }
    }
};
</script>
