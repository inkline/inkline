import CheckableFormItem from '../../mixins/forms/CheckableFormItem';

export default {
    name: 'Radio',
    computed: {
        checked () {
            return this.model === this.currentValue;
        }
    },
    mixins: [
        CheckableFormItem
    ]
};
