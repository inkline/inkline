import {
    AttributesProviderMixin,
    ClassesProviderMixin,
} from '@inkline/inkline/src/mixins';
import ITransitionExpand from '@inkline/inkline/src/transitions/ITransitionExpand';

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
