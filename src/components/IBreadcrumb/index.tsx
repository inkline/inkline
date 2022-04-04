import './style.scss';
import { computed, defineComponent } from '@inkline/paper';
import {
    defaultPropValue
} from '@inkline/inkline/mixins';
import { useColorVariant } from '@inkline/inkline/composables';
import {inklineSymbol} from "@inkline/inkline/plugin";

/**
 * Slot for default breadcrumb content
 * @name default
 * @kind slot
 */

const componentName = 'IBreadcrumb';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The aria-label of the breadcrumbs
         * @type String
         * @default Breadcrumbs
         * @name ariaLabel
         */
        ariaLabel: {
            type: String,
            default: 'Breadcrumbs'
        },
        /**
         * The color variant of the breadcrumb
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the breadcrumb
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size')
        }
    },
    setup (props, { provide, inject }) {
        const inkline = inject(inklineSymbol);
        const { color } = useColorVariant(inkline, props.color);

        const classes = computed(() => `${
            props.className ? ` ${props.className}` : ''
        }${
            color.value ? ` -${color.value}` : ''
        }${
            props.size ? ` -${props.size}` : ''
        }`, [color.value, props.size, props.className]);

        provide('example', classes.value, [classes.value]);
        console.log('provide in parent', classes.value);

        return {
            classes
        };
    },
    render ({ classes, ariaLabel }, { slot }) {
        return <nav
            class={`breadcrumb${classes.value}`}
            aria-label={ariaLabel}
        >
            <ol>
                { slot() }
            </ol>
        </nav>;
    }
});
