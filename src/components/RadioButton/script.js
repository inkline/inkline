import IButton from 'inkline/components/Button';
import IRadio from 'inkline/components/Radio';

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
