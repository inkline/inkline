import { h, computed, defineComponent, onMounted, inject } from 'vue';
import { defaultPropValue, sizePropValidator } from '@inkline/inkline/mixins';
import { renderSvg, toCamelCase } from '@inkline/inkline/helpers';
import { SvgNode } from '@inkline/inkline/types';

/**
 * The icon to be displayed
 * @type String
 * @default
 * @name name
 */

const componentName = 'IIcon';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
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
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    setup (props) {
        const icons = inject('inklineIcons') as Record<string, SvgNode>;
        const iconName = computed(() => toCamelCase(props.name));
        const icon = computed(() => icons[iconName.value]);
        const classes = computed(() => ({
            'inkline-icon': true,
            [`-${props.size}`]: Boolean(props.size)
        }));

        onMounted(() => {
            if (iconName.value && !icons[iconName.value]) {
                console.error(`The icon ${iconName.value} is not registered.`);
            }
        });

        return () => h(
            'svg',
            {
                class: classes.value,
                ...icon.value?.attributes
            },
            renderSvg(icon.value?.children || [])
        );
    }
});
