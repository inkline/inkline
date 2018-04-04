import CheckableFormItem from '../../mixins/CheckableFormItem';


export default {
    name: 'Radio',
    mixins: [
        CheckableFormItem
    ],
    props: {
        value: String
    }
};
