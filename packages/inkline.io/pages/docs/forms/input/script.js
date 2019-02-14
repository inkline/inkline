import View from '@components/View';
import { IInput } from '@inkline/inkline';

export default {
    extends: View,
    name: 'InputView',
    layout: 'documentation',
    head: {
        title: 'Input'
    },
    components: {
        IInput
    },
    data () {
        return {
            inputValue: '',
            disabledInputValue: '',
            clearableInputValue: '',
            prefixInputValue: '',
            suffixInputValue: '',
            prefixSuffixInputValue: '',
            prependInputValue: '',
            appendInputValue: '',
            prependAppendInputValue: '',
            smInputValue: '',
            mdInputValue: '',
            lgInputValue: '',
            labelDefaultInputValue: '',
            labelLeftInputValue: '',
            labelRightInputValue: ''
        };
    }
};
