import { defineComponent } from 'vue';
import { uid } from '@inkline/inkline/helpers';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default tab content
 */

const componentName = 'ITab';

export default defineComponent({
    name: componentName,
    inject: {
        tabs: {
            default: () => ({})
        }
    },
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
            default(): string {
                return uid('tab');
            }
        }
    },
    computed: {
        active(): boolean {
            return (this as any).tabs.active === this.name;
        },
        classes(): Classes {
            return {
                '-active': this.active
            };
        }
    }
});
