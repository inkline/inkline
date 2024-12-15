<script lang="ts">
import { h, computed, defineComponent, onMounted } from 'vue';
import { useOptions } from '@inkline/composables';
import type { DOMNode } from '@inkline/types';
import type { VNode } from 'vue';

/**
 * The icon to be displayed
 * @type String
 * @default
 * @name name
 */

const componentName = 'Icon';

export const renderSvg = (children: DOMNode[]): (VNode | string)[] =>
    children.map(({ type, props, children }) =>
        h(type, props ?? {}, children ? renderSvg(children) : [])
    );

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
         * The width of the icon. Will override the size prop
         * @type String | Number
         * @default undefined
         * @name width
         */
        width: {
            type: [String, Number],
            default: undefined
        },
        /**
         * The height of the icon. Will override the size prop
         * @type String | Number
         * @default undefined
         * @name height
         */
        height: {
            type: [String, Number],
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

            const rootNode = icon.value?.body[0];
            return rootNode
                ? h(
                      rootNode.type,
                      {
                          class: `icon ${props.name}`,
                          ...rootNode.props,
                          ...(props.width ? { width: props.width } : {}),
                          ...(props.height ? { height: props.height } : {})
                      },
                      renderSvg(rootNode.children ?? [])
                  )
                : null;
        };
    }
});
</script>
