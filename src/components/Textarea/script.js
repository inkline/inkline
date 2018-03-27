import Input from '../Input';

export default {
    name: 'Textarea',
    extends: Input,
    created () {
        console.log(this.$slots)
    }
};
