import IButton from '@inkline/inkline/src/components/Button';
import IRadio from '@inkline/inkline/src/components/Radio';

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
