import './style.scss';
import { h, computed, defineComponent, inject } from '@inkline/paper';
import { defaultPropValue } from '@inkline/inkline/mixins';
import { renderSvg, toCamelCase } from '@inkline/inkline/helpers';
import { SvgNode } from '@inkline/inkline/types';
import { inklineIconsSymbol } from '@inkline/inkline/plugin';

const componentName = 'IIcon';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The icon to be displayed
         * @type String
         * @default
         * @name name
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the icon
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
        const icons: Record<string, SvgNode> = inject(inklineIconsSymbol, {});
        const iconName = computed(() => toCamelCase(props.name), [props.name]);
        const icon = computed(() => icons[iconName.value]);
        const classes = computed(() => `${
            props.size ? ` -${props.size}` : ''
        }`, [props.size]);

        return { icon, classes };
    },
    render ({ classes, icon }) {
        return h(
            'svg',
            {
                class: `inkline-icon${classes.value}`,
                ...icon.value?.attributes
            },
            renderSvg(icon.value?.children || [])
        );
    }
});
