import { defineComponent } from 'vue';
import {
    computedPropValue,
    computedColorValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default nav content
 * @name default
 * @kind slot
 */

const componentName = 'INav';

export default defineComponent({
    name: componentName,
    provide () {
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
         * The color variant of the nav
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: computedPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the nav
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: computedPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * Display the nav with vertical orientation
         * @type Boolean
         * @default false
         * @name vertical
         */
        vertical: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes (): Classes {
            return {
                [`-${computedColorValue(componentName, this.color)}`]: true,
                [`-${this.size}`]: Boolean(this.size),
                '-vertical': this.vertical
            };
        }
    },
    methods: {
        onItemClick () {
            [(this as any).navbar, (this as any).sidebar].forEach((parent) => {
                parent.onItemClick();
            });
        }
    }
});
