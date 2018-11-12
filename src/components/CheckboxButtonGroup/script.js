import IInputGroup from 'inkline/components/InputGroup';
import IButtonGroup from 'inkline/components/ButtonGroup';

export default {
    name: 'ICheckboxButtonGroup',
    extends: IInputGroup,
    components: {
        IButtonGroup
    },
    created () {
        this.$on('change', value => {
            this.onInput(value);
        });
    }
};
