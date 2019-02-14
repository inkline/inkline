import View from '@components/View';
import { IButton, IHeader } from '@inkline/inkline';

export default {
    name: 'HeaderView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Header'
    },
    components: {
        IButton,
        IHeader
    }
};
