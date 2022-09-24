import { defineComponent } from 'vue';
import { Classes } from '@inkline/inkline/types';
import { computedSizeValue } from "@inkline/inkline/mixins";

/**
 * Slot for default button group content
 * @name default
 * @kind slot
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
    provide () {
        return {
            buttonGroup: this
        };
    },
    props: {
        /**
         * Display the button group with vertical orientation
         * @type Boolean
         * @default false
         * @name vertical
         */
        vertical: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button group as a block, spanning the full container width
         * @type Boolean
         * @default false
         * @name block
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the button group
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The size of the button group
         * @type String
         * @default
         * @name size
         */
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        computedSize (): string | undefined {
            return computedSizeValue(componentName, this.size || (this as any).buttonGroup.size);
        },
        classes (): Classes {
            return {
                [`-${this.computedSize}`]: Boolean(this.computedSize),
                '-vertical': this.vertical,
                '-block': this.block,
                '-disabled': this.isDisabled
            };
        },
        isDisabled (): boolean {
            return this.disabled || (this as any).buttonGroup.disabled || (this as any).form.disabled || (this as any).formGroup.disabled;
        }
    }
});
