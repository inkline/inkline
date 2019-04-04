<template lang="md" src="./select.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { ISelect, ISelectOption } from '@inkline/inkline';

export default {
    extends: View,
    name: 'SelectView',
    layout: 'documentation',
    head: {
        title: title('Select')
    },
    components: {
        ISelect,
        ISelectOption
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
