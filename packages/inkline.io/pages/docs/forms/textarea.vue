<template lang="md" src="./textarea.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    extends: View,
    name: 'TextareaView',
    layout: 'documentation',
    head: head({
        title: 'Textarea',
        description: 'Textareas are form components used for inputting data directly from the keyboard, on multiple lines.'
    }),
    data () {
        const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

        return {
            textareaValue: '',
            disabledTextareaValue: '',
            clearableTextareaValue: '',
            prefixTextareaValue: sampleText,
            suffixTextareaValue: sampleText,
            prefixSuffixTextareaValue: sampleText,
            prependTextareaValue: '',
            appendTextareaValue: '',
            prependAppendTextareaValue: '',
            smTextareaValue: '',
            mdTextareaValue: '',
            lgTextareaValue: '',
            labelDefaultTextareaValue: '',
            labelLeftTextareaValue: '',
            labelRightTextareaValue: ''
        };
    }
};
</script>
