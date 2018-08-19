import InputGroup from '../InputGroup';
import ButtonGroup from '../ButtonGroup';

export default {
    name: 'CheckboxGroup',
    extends: InputGroup,
    components: {
        IButtonGroup: ButtonGroup
    },
    created () {
        this.$on('change', value => {
            this.onInput(value);
        });
    }
};
