import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import ITransitionExpand from '@inkline/inkline/src/transitions/TransitionExpand';

export default {
    name: 'INavbarItems',
    inject: [ 'collapsible' ],
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin
    ],
    components: {
        ITransitionExpand
    }
};
