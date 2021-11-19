import { defineComponent } from 'vue';
import { uid } from '@inkline/inkline/helpers';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default tab title content
 * @name default
 * @kind slot
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
         * The name of the referenced tab
         * @type String
         * @default
         * @name for
         */
        for: {
            type: String,
            default (): string {
                return uid('tab');
            }
        }
    },
    computed: {
        active (): boolean {
            return (this as any).tabs.active === this.for;
        },
        classes (): Classes {
            return {
                '-active': this.active
            };
        },
        name (): string {
            return this.for;
        }
    },
    methods: {
        onClick () {
            (this as any).tabs.setActive(this.for);
        }
    }
});
