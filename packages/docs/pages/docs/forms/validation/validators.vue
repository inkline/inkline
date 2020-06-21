<template lang="md" src="./validators.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    extends: View,
    name: 'FormValidationValidatorsView',
    data () {
        return {
            alphaValidatorForm: this.$inkline.form({
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
            alphanumericValidatorForm: this.$inkline.form({
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
            customValidatorForm: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'custom', validator: (v) => /inkline/.test(v) }
                    ]
                }
            }),
            emailValidatorForm: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'email' }
                    ]
                }
            }),
            maxValidatorForm: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'max', value: 100 }
                    ]
                }
            }),
            maxLengthValidatorForm: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'maxLength', value: 12 }
                    ]
                }
            }),
            minValidatorForm: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'min', value: 10 }
                    ]
                }
            }),
            minLengthValidatorForm: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'minLength', value: 6 }
                    ]
                }
            }),
            numberValidatorForm: this.$inkline.form({
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
            requiredValidatorForm: this.$inkline.form({
                input: {
                    validators: [
                        { rule: 'required' }
                    ]
                }
            }),
            sameAsValidatorForm: this.$inkline.form({
                password: {},
                passwordConfirmation: {
                    validators: [
                        { rule: 'sameAs', target: 'password' }
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
            alert('submitted');
        }
    },
    filters: {
        prettify (value) {
            return JSON.stringify(value, null, 2);
        }
    }
};
</script>
