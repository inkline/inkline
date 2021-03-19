import { uid } from '@inkline/inkline/src/helpers';

/**
 * @name default
 * @kind slot
 * @description Slot for default tab content
 */

export default {
    name: 'ITab',
    props: {
        /**
         * @description The title of the tab
         * @type String
         * @default
         */
        title: {
            type: String,
            default: ''
        },
        /**
         * @description The name of the tab, used as an identifier
         * @type String
         * @default uid()
         */
        name: {
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
            return this.tabs.active === this.name;
        },
        classes() {
            return {
                '-active': this.active
            };
        }
    }
};
