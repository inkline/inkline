import View from '@components/View';
import { IButton, IButtonGroup } from '@inkline/inkline';

export default {
    name: 'ButtonGroupView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Button Group'
    },
    components: {
        IButton,
        IButtonGroup
    }
};
