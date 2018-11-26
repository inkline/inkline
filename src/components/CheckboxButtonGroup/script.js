import IFormGroup from 'inkline/components/FormGroup';
import IButtonGroup from 'inkline/components/ButtonGroup';

export default {
    name: 'ICheckboxButtonGroup',
    extends: IFormGroup,
    components: {
        IButtonGroup
    },
    created () {
        this.$on('change', value => {
            this.onInput(value);
        });
    }
};
