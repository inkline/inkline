import InputGroup from '../InputGroup';

export default {
    name: 'CheckboxGroup',
    extends: InputGroup,
    created () {
        this.$on('change', value => {
            this.onInput(value);
        });
    }
};
