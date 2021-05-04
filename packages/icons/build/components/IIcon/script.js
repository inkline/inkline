import { h, computed, defineComponent, onMounted } from 'vue';
import { IconController } from "../../controllers";
import { toCamelCase } from '../../helpers';
const renderChildren = (children) => children
    .map((child) => child.type === 'element'
    ? h(child.name, child.attributes, renderChildren(child.children || []))
    : child.value);
export default defineComponent({
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
        const iconName = computed(() => toCamelCase(props.name));
        const icon = computed(() => IconController.icons[iconName.value]);
        const classes = computed(() => ({
            'inkline-icon': true,
            [`-${props.size}`]: Boolean(props.size)
        }));
        onMounted(() => {
            if (!IconController.icons[iconName.value]) {
                throw new Error(`The icon ${iconName.value} is not registered.`);
            }
        });
        return () => h('svg', {
            class: classes.value,
            ...icon.value?.attributes
        }, renderChildren(icon.value?.children || []));
    }
});
//# sourceMappingURL=script.js.map