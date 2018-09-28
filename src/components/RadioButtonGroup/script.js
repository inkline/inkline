import InputGroup from '../InputGroup';
import ButtonGroup from '../ButtonGroup';

export default {
    name: 'RadioButtonGroup',
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
