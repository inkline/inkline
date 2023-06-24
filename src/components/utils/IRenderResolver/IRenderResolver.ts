import { defineComponent, h, PropType, RenderFunction } from 'vue';

export default defineComponent({
    props: {
        /**
         * The primitive or render function to render.
         * @type String | Number | Boolean | RenderFunction
         * @default
         * @name data
         */
        data: {
            type: [String, Number, Boolean, Function] as PropType<
                number | boolean | string | RenderFunction
            >,
            required: true
        },
        /**
         * The tag to use for rendering primitives
         * @type String
         * @default div
         * @name tag
         */
        tag: {
            type: String,
            default: 'div'
        }
    },
    setup(props) {
        return () => (typeof props.data === 'function' ? props.data() : h(props.tag, props.data));
    }
});
