<template lang="md" src="./select.md" />
<script>
import View from '~/components/docs/View';

export default {
    extends: View,
    name: 'SelectView',
    data () {
        return {
            selectValue: '',
            disabledSelectValue: '',
            readonlySelectValue: '',
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
