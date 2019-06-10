<template lang="md" src="./validators.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    extends: View,
    name: 'FormValidationValidatorsView',
    layout: 'documentation',
    head: head({
        title: 'Validators - Form Validation',
        description: 'Inkline\'s validators are functions used to check whether an input value matches a specific criteria.'
    }),
    data () {
        return {
            alphaValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'alpha' }
                    ]
                },
                inputSpaces: {
                    validators: [
                        { rule: 'alpha', allowSpaces: true }
                    ]
                },
                inputDashes: {
                    validators: [
                        { rule: 'alpha', allowDashes: true }
                    ]
                }
            }),
            alphanumericValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'alphanumeric' }
                    ]
                },
                inputSpaces: {
                    validators: [
                        { rule: 'alphanumeric', allowSpaces: true }
                    ]
                },
                inputDashes: {
                    validators: [
                        { rule: 'alphanumeric', allowDashes: true }
                    ]
                }
            }),
            customValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'custom', validator: (v) => /inkline/.test(v) }
                    ]
                }
            }),
            emailValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'email' }
                    ]
                }
            }),
            maxValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'max', value: 100 }
                    ]
                }
            }),
            maxLengthValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'maxLength', value: 12 }
                    ]
                }
            }),
            minValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'min', value: 10 }
                    ]
                }
            }),
            minLengthValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'minLength', value: 6 }
                    ]
                }
            }),
            numberValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'number' }
                    ]
                },
                inputNegative: {
                    validators: [
                        { rule: 'number', allowNegative: true }
                    ]
                },
                inputNegativeDecimal: {
                    validators: [
                        { rule: 'number', allowNegative: true, allowDecimal: true }
                    ]
                }
            }),
            requiredValidatorForm: this.$form({
                input: {
                    validators: [
                        { rule: 'required' }
                    ]
                }
            }),
            sameAsValidatorForm: this.$form({
                password: {},
                passwordConfirmation: {
                    validators: [
                        { rule: 'sameAs', target: 'password' }
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
            })
        };
    },
    methods: {
        addField() {
            this.listForm.items.$push({
                value: 'Added Field'
            });
        },
        removeField() {
            this.listForm.items.$splice(0, 1);
        },
        replaceField() {
            this.listForm.items.$splice(0, 1, {
                value: 'Spliced Field'
            });
        },
        setEmail() {
            this.objectForm.$set('email', {
                validators: [
                    { rule: 'email' }
                ]
            }, { instance: this });
        },
        setAddress() {
            this.objectForm.$set('address', {
                value: '32 Inkline St.'
            }, { instance: this });
        },
        submitForm() {
            alert('submitted')
        }
    },
    filters: {
        prettify (value) {
            return JSON.stringify(value, null, 2);
        }
    }
};
</script>
