import type { PropType } from 'vue';
import { defineComponent, h, Text } from 'vue';
import type {
    Renderable,
    RenderableComponent,
    RenderableArray,
    RenderableNode,
    RenderableFunction
} from '@inkline/types';
import { interpolate } from '@inkline/utils';

export default defineComponent({
    props: {
        /**
         * The primitive or render function to render. It can accept either primitive types (String, Number, Boolean), a render function, or a Vue component.
         * @type {string | number | boolean | Component | VNode | RenderableFunction}
         * @default ''
         * @name render
         */
        render: {
            type: [String, Number, Boolean, Function, Array, Object] as PropType<Renderable>,
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
        function renderArray(target: RenderableArray): RenderableNode[] {
            return target.map(render) as RenderableNode[];
        }

        function renderFunction(target: RenderableFunction): RenderableNode {
            return render(target(props.ctx)) as RenderableNode;
        }

        function renderObject(target: RenderableComponent | RenderableNode): RenderableNode {
            return h(target, { ...props.ctx });
        }

        function renderString(target: string): RenderableNode {
            const interpolatedString = interpolate(target, props.ctx);
            return props.tag ? h(props.tag, interpolatedString) : h(Text, interpolatedString);
        }

        function renderPrimitive(target: number | boolean): RenderableNode {
            return props.tag ? h(props.tag, target) : h(Text, target);
        }

        function render(target: Renderable): RenderableNode | RenderableNode[] {
            switch (true) {
                case Array.isArray(target):
                    return renderArray(target);
                case typeof target === 'function':
                    return renderFunction(target as RenderableFunction);
                case typeof target === 'object':
                    return renderObject(target);
                case typeof target === 'string':
                    return renderString(target);
                default:
                    return renderPrimitive(target);
            }
        }

        return () => render(props.render);
    }
});
