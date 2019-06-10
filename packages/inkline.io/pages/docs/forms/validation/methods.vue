<template lang="md" src="./methods.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    extends: View,
    name: 'FormValidationMethodsView',
    layout: 'documentation',
    head: head({
        title: 'Methods - Form Validation',
        description: 'Inkline\'s form validation schema can be used to dynamically add schema fields and groups with ease.'
    }),
    data () {
        return {
            listForm: this.$form({
                items: [
                    { value: 'Existing Field' },
                    { value: 'Existing Field' }
                ]
            }),

            objectForm: this.$form({
                fullName: {}
            }),
        };
    },
    methods: {
        addField() {
            this.listForm.items.add({
                value: 'Added Field'
            });
        },
        removeField() {
            this.listForm.items.remove(0, 1);
        },
        replaceField() {
            this.listForm.items.remove(0, 1, {
                value: 'Spliced Field'
            });
        },
        setEmail() {
            this.objectForm.set('email', {
                validators: [
                    { rule: 'email' }
                ]
            }, { instance: this });
        },
        setAddress() {
            this.objectForm.set('address', {
                value: '32 Inkline St.'
            }, { instance: this });
        }
    },
    filters: {
        prettify (value) {
            return JSON.stringify(value, null, 2);
        }
    }
};
</script>
