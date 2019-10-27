<template lang="md" src="./select.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { ISelect, ISelectOption, IFormGroup } from "@inkline/inkline/src/components";

export default {
    extends: View,
    name: 'SelectView',
    layout: 'documentation',
    head: head('docs-forms-select'),
    components: {
        ISelect,
        ISelectOption,
        IFormGroup
    },
    data () {
        return {
            selectValue: '',
            disabledSelectValue: '',
            clearableSelectValue: '',
            prefixSelectValue: '',
            suffixSelectValue: '',
            prefixSuffixSelectValue: '',
            prependSelectValue: '',
            appendSelectValue: '',
            prependAppendSelectValue: '',
            smSelectValue: '',
            mdSelectValue: '',
            lgSelectValue: '',
            labelDefaultSelectValue: '',
            labelLeftSelectValue: '',
            labelRightSelectValue: ''
        };
    }
};
</script>
