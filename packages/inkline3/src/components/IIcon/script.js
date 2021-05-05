import { h, computed } from 'vue';
import { IconController } from "@inkline/inkline/src/controllers";
import { toCamelCase } from '@inkline/inkline/src/helpers';

const renderChildren = (children) =>
    children
        .map((child) => child.type === 'element'
            ? h(child.name, child.attributes, child.children ? renderChildren(child.children) : [])
            : child.value
)

export default {
    name: 'IIcon',
    props: {
        /**
         * @description The icon to be displayed
         * @type String
         * @default
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * @description The size variant of the icon
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const icon = computed(() => IconController.icons[toCamelCase(props.name)]);
        const classes = computed(() => ({
            'inkline-icon': true,
            [`-${props.size}`]: Boolean(props.size)
        }));

        return () => h(
            'svg',
            {
                class: classes.value,
                ...icon.value?.attributes
            },
            renderChildren(icon.value?.children || [])
        );
    }
};
