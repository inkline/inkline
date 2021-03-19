import { uid } from '@inkline/inkline/src/helpers';

/**
 * @name default
 * @kind slot
 * @description Slot for default tab title content
 */

export default {
    name: 'ITabTitle',
    props: {
        /**
         * @description The name of the referenced tab
         * @type String
         * @default
         */
        for: {
            type: String,
            default() {
                return uid('tab');
            }
        }
    },
    inject: {
        tabs: {
            default: () => ({})
        }
    },
    computed: {
        active() {
            return this.tabs.active === this.for;
        },
        classes() {
            return {
                '-active': this.active
            };
        },
        name() {
            return this.for;
        }
    },
    methods: {
        onClick() {
            this.tabs.setActive(this.for);
        }
    }
};
