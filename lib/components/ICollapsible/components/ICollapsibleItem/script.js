import { defineComponent } from 'vue';
import { uid } from '../../../../helpers/uid';
import IExpandTransition from '../../../../transitions/IExpandTransition/index.vue';
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
            default: () => ({})
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
            default() {
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
        active() {
            return this.collapsible.activeItems.indexOf(this.name) > -1;
        },
        classes() {
            return {
                '-active': this.active
            };
        }
    },
    methods: {
        onClick() {
            this.collapsible.onItemClick(this);
        },
    }
});
//# sourceMappingURL=script.js.map