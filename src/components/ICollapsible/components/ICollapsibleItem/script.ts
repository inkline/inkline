import { defineComponent } from 'vue';
import { uid } from '@inkline/inkline/helpers';
import { IExpandTransition } from '@inkline/inkline/transitions';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default collapsible item content
 */

/**
 * @name header
 * @kind slot
 * @description Slot for collapsible item header content
 */

const componentName = 'ICollapsibleItem';

export default defineComponent({
    name: componentName,
    components: {
        IExpandTransition
    },
    inject: {
        collapsible: {
            default: () => ({
                activeItems: []
            })
        }
    },
    props: {
        /**
         * @description The unique identifier of the collapsible item, used for determining if the item is open or not
         * @type String
         * @default uid()
         */
        name: {
            type: String,
            default () {
                return uid('collapsible-item');
            }
        },
        /**
         * @description The title of the collapsible item
         * @type String
         */
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        active (): boolean {
            return (this as any).collapsible.activeItems.indexOf(this.name) > -1;
        },
        classes (): Classes {
            return {
                '-active': this.active
            };
        }
    },
    methods: {
        onClick () {
            (this as any).collapsible.onItemClick(this);
        }
    }
});
