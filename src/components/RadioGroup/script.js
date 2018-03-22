import InputGroup from '../InputGroup';

export default {
    name: 'RadioGroup',
    extends: InputGroup,
    created () {
        this.$on('change', value => {
            this.onInput(value);
        });
    }
};
