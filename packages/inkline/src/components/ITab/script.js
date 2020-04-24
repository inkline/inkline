import { uid } from '@inkline/inkline/src/helpers/uid';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    EmitProviderMixin,
    ActiveClassPropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'ITab',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,

        ActiveClassPropertyMixin,
    ],
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
