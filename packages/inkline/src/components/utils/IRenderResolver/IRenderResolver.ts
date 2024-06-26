import type { Raw, Component, PropType } from 'vue';
import { defineComponent, h, Text } from 'vue';
import type { LabelRenderFunction } from '@inkline/inkline/types';
import { interpolate } from '@inkline/inkline/utils';

export default defineComponent({
    props: {
        /**
         * The primitive or render function to render. It can accept either primitive types (String, Number, Boolean), a render function, or a Vue component.
         * @type String | Number | Boolean | LabelRenderFunction | Raw<Component>
         * @default ''
         * @name render
         */
        render: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                number | boolean | string | LabelRenderFunction | Raw<Component>
            >,
            default: ''
        },
        /**
         * The context object that is passed to the component props, render function, or used for string interpolation.
         * @type Object
         * @default {}
         * @name ctx
         */
        ctx: {
            type: Object,
            default: () => ({})
        },
        /**
         * The HTML tag to use for rendering primitives. If not specified, no tag will be rendered.
         * @type String
         * @default
         * @name tag
         */
        tag: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        return () => {
            switch (true) {
                case typeof props.render === 'function':
                    return (props.render as LabelRenderFunction)(props.ctx);
                case typeof props.render === 'object':
                    return h(props.render as Component, { ctx: props.ctx });
                case typeof props.render === 'string': {
                    const children = interpolate(props.render as string, props.ctx);
                    return props.tag ? h(props.tag, children) : h(Text, children);
                }
                default:
                    return props.tag
                        ? h(props.tag, props.render as number | boolean)
                        : h(Text, props.render as number | boolean);
            }
        };
    }
});
