<template lang="md" src="./form-validation.md" />
<script>
import View from '@components/View';
import { IForm, IFormGroup, IFormLabel, IInput, ITextarea, ICheckbox, ICheckboxGroup, IRadio, IRadioGroup } from '@inkline/inkline';

export default {
    extends: View,
    name: 'FormValidationView',
    layout: 'documentation',
    head: {
        title: 'Form Validation'
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
            }),

            listForm: this.$form({
                items: [
                    { value: 'Existing Field' },
                    { value: 'Existing Field' }
                ]
            }),

            objectForm: this.$form({
                name: {}
            }),
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
