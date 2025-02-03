import type { Raw, Component, PropType } from 'vue';
import { defineComponent, h, Text } from 'vue';
import type { RenderFunction } from '@inkline/types';
import { interpolate } from '@inkline/utils';

export default defineComponent({
    props: {
        /**
         * The primitive or render function to render. It can accept either primitive types (String, Number, Boolean), a render function, or a Vue component.
         * @type {string | number | boolean | RenderFunction | Raw<Component>}
         * @default ''
         * @name render
         */
        render: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                number | boolean | string | RenderFunction | Raw<Component>
            >,
            default: ''
        },
        /**
         * The context object that is passed to the component props, render function, or used for string interpolation.
         * @type {Object}
         * @default {}
         * @name ctx
         */
        ctx: {
            type: Object,
            default: () => ({})
        },
        /**
         * The HTML tag to use for rendering primitives. If not specified, no tag will be rendered.
         * @type {string}
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
                    return (props.render as RenderFunction)(props.ctx);
                case typeof props.render === 'object':
                    return h(props.render as Component, { ctx: props.ctx });
                case typeof props.render === 'string': {
                    const children = interpolate(props.render, props.ctx);
                    return props.tag ? h(props.tag, children) : h(Text, children);
                }
                default:
                    return props.tag ? h(props.tag, props.render) : h(Text, props.render);
            }
        };
    }
});
