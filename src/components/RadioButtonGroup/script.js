import IFormGroup from 'inkline/components/FormGroup';
import IButtonGroup from 'inkline/components/ButtonGroup';

export default {
    name: 'IRadioButtonGroup',
    extends: IFormGroup,
    components: {
        IButtonGroup
    },
    created () {
        this.$on('change', value => {
            this.emitInput(value);
        });
    }
};
