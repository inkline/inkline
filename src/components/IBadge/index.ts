import './style.scss';
import { computed, defineComponent, h, inject } from '@inkline/paper';
import {
    defaultPropValue
} from '@inkline/inkline/mixins';
import { $inkline, inklineSymbol } from '@inkline/inkline/plugin';

const componentName = 'IBadge';

const useColorVariant = (color?: string) => {
    if (!color && $inkline.prototype) {
        if ($inkline.prototype.options.value.colorMode === 'system') {
            color = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        } else {
            color = $inkline.prototype.options.value.colorMode;
        }
    }

    return color;
};

export default defineComponent({
    name: componentName,
    slots: [
        /**
         * Slot for default badge content
         * @name default
         * @kind slot
         */
        'default'
    ],
    props: {
        /**
         * The color variant of the badge
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the badge
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size')
        }
    },
    setup (props) {
        const inkline = inject(inklineSymbol);
        const colorVariant = useColorVariant(props.color);

        console.log(colorVariant, inkline, ($inkline as any).test);

        const classes = computed(() => `${
            props.className ? ` ${props.className}` : ''
        }${
            colorVariant ? ` -${colorVariant}` : ''
        }${
            props.size ? ` -${props.size}` : ''
        }`, [colorVariant, props.size, props.className]);

        return { classes };
    },
    render ({ classes }, { slot }) {
        return h('div', { class: `badge${classes.value}` }, slot());
    }
});
