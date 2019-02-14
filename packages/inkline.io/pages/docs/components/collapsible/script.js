import View from '@components/View';
import { ICollapsible, ICollapsibleItem } from '@inkline/inkline';

export default {
    name: 'CollapsibleView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Collapsible'
    },
    data() {
        return {
            active: ['panel-1']
        };
    },
    components: {
        ICollapsible,
        ICollapsibleItem
    }
};
