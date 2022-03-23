import './style.scss';
import { computed, defineComponent, h } from '@inkline/paper';
import {
    defaultPropValue
} from '@inkline/inkline/mixins';
import { useColorVariant } from '@inkline/inkline/composables';

const componentName = 'IBadge';

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
        const { color } = useColorVariant(props.color);

        const classes = computed(() => `${
            props.className ? ` ${props.className}` : ''
        }${
            color.value ? ` -${color.value}` : ''
        }${
            props.size ? ` -${props.size}` : ''
        }`, [color.value, props.size, props.className]);

        return {
            classes
        };
    },
    render ({ classes }, { slot }) {
        return <div class={`badge${classes.value}`}>
            { slot() }
        </div>;
    }
});
