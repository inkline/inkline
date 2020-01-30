import IButton from '@inkline/inkline/src/components/Button';
import IRadio from '@inkline/inkline/src/components/Radio';

export default {
    name: 'IRadioButton',
    extends: IRadio,
    components: {
        IButton
    },
    data() {
        return {
            parentFormGroupName: 'IRadioButtonGroup'
        }
    }
};
