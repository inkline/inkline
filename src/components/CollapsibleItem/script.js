import { uid } from '../../helpers/unique-id';

import TransitionExpand from '../../transitions/TransitionExpand';

import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from '../../mixins/components/providers/EmitProviderMixin';

import ActiveClassPropertyMixin from '../../mixins/components/properties/ActiveClassPropertyMixin';

export default {
    name: 'Collapsible',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,

        ActiveClassPropertyMixin,
    ],
    components: {
        TransitionExpand
    },
    inject: ['collapsible'],
    props: {
        title: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default () {
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
            this.dispatch('Collapsible', 'item-click', this);
        },
    }
};