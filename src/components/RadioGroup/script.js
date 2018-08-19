import ButtonGroup from '../ButtonGroup';
import InputGroup from '../InputGroup';

export default {
    name: 'RadioGroup',
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
