import CheckableProviderMixin from 'inkline/mixins/forms/providers/CheckableProviderMixin';

export default {
    name: 'IRadio',
    mixins: [
        CheckableProviderMixin
    ],
    computed: {
        checked () {
            return this.model === this.currentValue;
        }
    }
};
