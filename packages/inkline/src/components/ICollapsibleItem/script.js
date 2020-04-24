import { uid } from '@inkline/inkline/src/helpers/uid';
import ITransitionExpand from '@inkline/inkline/src/transitions/ITransitionExpand';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    EmitProviderMixin,
    ActiveClassPropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'ICollapsibleItem',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,

        ActiveClassPropertyMixin,
    ],
    components: {
        ITransitionExpand
    },
    inject: ['collapsible'],
    props: {
        title: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default() {
                return uid('collapsible-item');
            }
        }
    },
    computed: {
        active() {
            return this.collapsible.activeItems.indexOf(this.id) > -1;
        },
    },
    methods: {
        onClick() {
            this.dispatch('ICollapsible', 'item-click', this);
        },
    }
};
