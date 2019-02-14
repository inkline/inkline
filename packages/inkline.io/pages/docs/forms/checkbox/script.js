import View from '@components/View';
import { ICheckbox, ICheckboxButton, ICheckboxGroup, ICheckboxButtonGroup } from '@inkline/inkline';

export default {
    name: 'CheckboxView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Checkbox'
    },
    components: {
        ICheckbox,
        ICheckboxButton,
        ICheckboxGroup,
        ICheckboxButtonGroup
    },
    data () {
        return {
            checked: true,
            checkedGroup: ['Football', 'Basketball', 'Tennis'],
            checkedSize: ['Basketball'],
            checkedSizeGroupSm: ['Basketball', 'Tennis'],
            checkedSizeGroupMd: ['Basketball', 'Tennis'],
            checkedSizeGroupLg: ['Basketball', 'Tennis'],
            checkedCustomTrue: ['Basketball'],
            checkedCustomFalse: ['Basketball'],
            checkedButton: ['Earth']
        };
    }
};
