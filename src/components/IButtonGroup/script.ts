import { defineComponent } from 'vue';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default button group content
 */

const componentName = 'IButtonGroup';

export default defineComponent({
    name: componentName,
    inject: {
        form: {
            default: () => ({})
        },
        buttonGroup: {
            default: () => ({})
        },
        formGroup: {
            default: () => ({})
        }
    },
    provide() {
        return {
            buttonGroup: this
        };
    },
    props: {
        /**
         * @description Display the button group with vertical orientation
         * @type Boolean
         * @default false
         */
        vertical: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the button group as a block, spanning the full container width
         * @type Boolean
         * @default false
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the button group
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes(): Classes {
            return {
                '-vertical': this.vertical,
                '-block': this.block,
                '-disabled': this.isDisabled,
            };
        },
        isDisabled(): boolean {
            return this.disabled || (this as any).buttonGroup.disabled || (this as any).form.disabled || (this as any).formGroup.disabled;
        }
    }
});
