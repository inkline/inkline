import { uid } from '@inkline/inkline/src/helpers/uid';
import IExpandTransition from '@inkline/inkline/src/transitions/IExpandTransition/index.vue';

export default {
    name: 'ICollapsibleItem',
    components: {
        IExpandTransition
    },
    inject: ['collapsible'],
    props: {
        id: {
            type: String,
            default() {
                return uid('collapsible-item');
            }
        },
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        active() {
            return this.collapsible.activeItems.indexOf(this.id) > -1;
        },
        classes() {
            return {
                '-active': this.active
            }
        }
    },
    methods: {
        onClick() {
            this.collapsible.onItemClick(this);
        },
    }
};
