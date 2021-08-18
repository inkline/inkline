import { defineComponent } from 'vue';
import { uid } from '../../../../helpers';
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
            default() {
                return uid('tab');
            }
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
});
//# sourceMappingURL=script.js.map