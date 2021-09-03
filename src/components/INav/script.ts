import { defineComponent } from 'vue';
import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator,
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default nav content
 */

const componentName = 'INav';

export default defineComponent({
    name: componentName,
    provide() {
        return {
            nav: this
        };
    },
    inject: {
        navbar: {
            default: () => ({
                onItemClick: () => {}
            })
        },
        sidebar: {
            default: () => ({
                onItemClick: () => {}
            })
        }
    },
    props: {
        /**
         * @description The color variant of the nav
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The size variant of the nav
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * @description Display the nav with vertical orientation
         * @type Boolean
         * @default false
         */
        vertical: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes(): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-vertical': this.vertical,
            };
        }
    },
    methods: {
        onItemClick() {
            [(this as any).navbar, (this as any).sidebar].forEach((parent) => {
                parent.onItemClick();
            });
        }
    }
});
