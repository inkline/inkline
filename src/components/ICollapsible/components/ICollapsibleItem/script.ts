import { defineComponent } from 'vue';
import { uid } from '@inkline/inkline/helpers';
import { IExpandTransition } from '@inkline/inkline/transitions';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default collapsible item content
 * @name default
 * @kind slot
 */

/**
 * Slot for collapsible item header content
 * @name header
 * @kind slot
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
    inheritAttrs: false,
    props: {
        /**
         * The unique identifier of the collapsible item, used for determining if the item is open or not
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default () {
                return uid('collapsible-item');
            }
        },
        /**
         * The title of the collapsible item
         * @type String
         * @default
         * @name title
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
