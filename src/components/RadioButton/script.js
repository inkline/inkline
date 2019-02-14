import IButton from '@inkline/inkline/components/Button';
import IRadio from '@inkline/inkline/components/Radio';

export default {
    name: 'IRadioButton',
    components: {
        IButton
    },
    data() {
        return {
            parentFormGroupName: 'IRadioButtonGroup'
        }
    },
    extends: IRadio
};
