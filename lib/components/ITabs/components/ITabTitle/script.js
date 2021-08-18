import { defineComponent } from 'vue';
import { uid } from '../../../../helpers';
/**
 * @name default
 * @kind slot
 * @description Slot for default tab title content
 */
const componentName = 'ITabTitle';
export default defineComponent({
    name: componentName,
    inject: {
        tabs: {
            default: () => ({})
        }
    },
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
});
//# sourceMappingURL=script.js.map