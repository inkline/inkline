import type { Raw, Component, PropType } from 'vue';
import { defineComponent, h, Text } from 'vue';
import type { LabelRenderFunction } from '@inkline/inkline/types';
import { interpolate } from '@inkline/inkline/utils';

export default defineComponent({
    props: {
        /**
         * The primitive or render function to render.
         * @type String | Number | Boolean | RenderFunction
         * @default '
         * @name data
         */
        render: {
            type: [String, Number, Boolean, Function, Object] as PropType<
                number | boolean | string | LabelRenderFunction | Raw<Component>
            >,
            default: ''
        },
        /**
         * The context to pass to the render function
         * @type Object
         * @default {}
         * @name ctx
         */
        ctx: {
            type: Object,
            default: () => ({})
        },
        /**
         * The tag to use for rendering primitives
         * @type String
         * @default span
         * @name tag
         */
        tag: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        switch (true) {
            case typeof props.render === 'function':
                return () => (props.render as LabelRenderFunction)(props.ctx);
            case typeof props.render === 'object':
                return () => h(props.render as Component, { ctx: props.ctx });
            case typeof props.render === 'string':
                return () => h(props.tag ?? Text, interpolate(props.render as string, props.ctx));
            default:
                return () => h(props.tag ?? Text, props.render as number | boolean);
        }
    }
});
