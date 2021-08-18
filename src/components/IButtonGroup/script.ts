import { defineComponent } from 'vue';
import { defaultPropValue, sizePropValidator } from '@inkline/inkline/src/mixins';
import {Classes} from "@inkline/inkline/src/types";

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
        },
        /**
         * @description The size variant of the button group
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    computed: {
        classes(): Classes {
            return {
                [`-${this.size}`]: Boolean(this.size),
                '-vertical': this.vertical,
                '-block': this.block,
                '-disabled': this.disabled,
            };
        },
        isDisabled(): boolean {
            return this.disabled || (this as any).form.disabled || (this as any).formGroup.disabled;
        }
    }
});
