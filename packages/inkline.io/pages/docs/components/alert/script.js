import View from '@components/View';
import { IAlert } from '@inkline/inkline';

export default {
    name: 'AlertView',
    layout: 'documentation',
    extends: View,
    components: {
        IAlert
    },
    data() {
        return {
            visible: true
        };
    }
};
