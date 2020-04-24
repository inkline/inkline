import IButton from '@inkline/inkline/src/components/IButton';
import IRadio from '@inkline/inkline/src/components/IRadio';

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
