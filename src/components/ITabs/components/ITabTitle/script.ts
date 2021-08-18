import { defineComponent } from 'vue';
import { uid } from '@inkline/inkline/src/helpers';
import { Classes } from '@inkline/inkline/src/types';

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
            default(): string {
                return uid('tab');
            }
        }
    },
    computed: {
        active(): boolean {
            return (this as any).tabs.active === this.for;
        },
        classes(): Classes {
            return {
                '-active': this.active
            };
        },
        name(): string {
            return this.for;
        }
    },
    methods: {
        onClick() {
            (this as any).tabs.setActive(this.for);
        }
    }
});
