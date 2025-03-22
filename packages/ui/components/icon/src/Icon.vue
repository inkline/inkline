<script lang="ts">
import { h, computed, defineComponent, onMounted, PropType } from 'vue';
import { useOptions } from '@inkline/composables';
import type { DOMNode } from '@inkline/types';
import type { VNode } from 'vue';

const componentName = 'Icon';

export const renderSvg = (children: DOMNode[]): (VNode | string)[] =>
    children.map(({ type, props, children }) =>
        h(type, props ?? {}, children ? renderSvg(children) : [])
    );

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The icon to be displayed
         * @param {string} name
         * @default
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * The color of the icon
         * @param {'inherit' | light' | 'dark' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'} color
         * @default undefined
         */
        color: {
            type: String,
            default: 'inherit'
        },
        /**
         * The size of the icon
         * @param {string | number} size
         * @default undefined
         */
        size: {
            type: [String, Number] as PropType<string | number>,
            default: undefined
        },
        /**
         * The width of the icon. Will override the size prop
         * @param {string | number} width
         * @default undefined
         */
        width: {
            type: [String, Number] as PropType<string | number>,
            default: undefined
        },
        /**
         * The height of the icon. Will override the size prop
         * @param {string | number} height
         * @default undefined
         */
        height: {
            type: [String, Number] as PropType<string | number>,
            default: undefined
        }
    },
    setup(props) {
        const { options } = useOptions();
        const icon = computed(() => options.value.icons?.definitions[props.name]);

        onMounted(() => {
            if (props.name && !options.value.icons?.definitions[props.name]) {
                console.error(`The icon ${props.name} is not registered.`);
            }
        });

        return () => {
            if (options.value.icons?.component) {
                return h(options.value.icons.component, props);
            }

            const color = props.color;
            const width = props.width ?? props.size;
            const height = props.height ?? props.size;

            const rootNode = icon.value?.body[0];
            return rootNode
                ? h(
                      rootNode.type,
                      {
                          class: `icon ${props.name} ${color ? `-${color}` : ''}`,
                          ...rootNode.props,
                          ...(width ? { width } : {}),
                          ...(height ? { height } : {})
                      },
                      renderSvg(rootNode.children ?? [])
                  )
                : null;
        };
    }
});
</script>
