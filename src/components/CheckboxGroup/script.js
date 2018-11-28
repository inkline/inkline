import IFormGroup from 'inkline/components/FormGroup';

export default {
    name: 'ICheckboxGroup',
    extends: IFormGroup,
    created () {
        this.$on('change', value => {
            this.emitInput(value);
        });
    }
};
