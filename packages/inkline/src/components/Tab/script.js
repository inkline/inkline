import { uid } from '@inkline/inkline/src/helpers/uid';

import ITransitionExpand from '@inkline/inkline/src/transitions/TransitionExpand';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from '@inkline/inkline/src/mixins/components/providers/EmitProviderMixin';

import ActiveClassPropertyMixin from '@inkline/inkline/src/mixins/components/properties/ActiveClassPropertyMixin';

export default {
    name: 'ITab',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,

        ActiveClassPropertyMixin,
    ],
    components: {
        ITransitionExpand
    },
    inject: ['tabs'],
    props: {
        title: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default() {
                return uid('tab');
            }
        }
    },
    computed: {
        active() {
            return this.tabs.active === this.id;
        },
    },
    mounted() {
        this.dispatch('ITabs', 'init');
    },
    destroyed() {
        this.dispatch('ITabs', 'init');
    }
};
