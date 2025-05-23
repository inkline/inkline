<script lang="ts">
import { defineComponent, h } from 'vue';
import { Input } from '../input';
import { uid } from '@inkline/utils';

const componentName = 'Textarea';

export default defineComponent({
    name: componentName,
    components: {
        Input
    },
    inheritAttrs: true,
    props: {
        ...Input.props,
        /**
         * The unique identifier of the textarea
         * @param {string} name
         * @default uid()
         */
        name: {
            type: String,
            default: () => {
                return uid('textarea');
            }
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue',
        /**
         * Event emitted when clearing the input element
         * @event clear
         */
        'clear'
    ],
    setup(props, { attrs, slots, emit }) {
        const onUpdateModelValue = (value: string) => {
            emit('update:modelValue', value);
        };

        const onClear = () => {
            emit('clear');
        };

        // Bind and re-emit input events
        const bindings = {
            onClear,
            'onUpdate:modelValue': onUpdateModelValue
        };

        return () =>
            h(
                Input,
                {
                    ...attrs,
                    ...props,
                    ...bindings,
                    type: 'textarea'
                },
                slots
            );
    }
});
</script>
