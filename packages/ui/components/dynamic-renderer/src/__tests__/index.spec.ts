import { render } from '@testing-library/vue';
import { DynamicRenderer } from '../index';
import { h, defineComponent, markRaw } from 'vue';

describe('DynamicRenderer', () => {
    it('should handle render function', () => {
        const props = {
            render: (ctx: { text: string }) => h('div', ctx.text),
            ctx: { text: 'Hello, world!' }
        };

        const wrapper = render(DynamicRenderer, {
            props
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should handle rendering as Component', () => {
        const CustomComponent = defineComponent({
            props: {
                ctx: {
                    type: Object,
                    default: () => ({})
                }
            },
            setup(props) {
                return () => h('div', props.ctx.text);
            }
        });

        const wrapper = render(DynamicRenderer, {
            props: {
                render: markRaw(CustomComponent),
                ctx: { text: 'Hello, object!' }
            }
        });

        expect(wrapper.getByText('Hello, object!')).toBeDefined();
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should handle rendering a string with interpolation', () => {
        const wrapper = render(DynamicRenderer, {
            props: {
                render: 'Hello, {{name}}!',
                ctx: { name: 'John' }
            }
        });

        expect(wrapper.getByText('Hello, John!')).toBeDefined();
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should handle rendering a number', () => {
        const wrapper = render(DynamicRenderer, {
            props: {
                render: 42
            }
        });

        expect(wrapper.getByText('42')).toBeDefined();
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should handle rendering a boolean', () => {
        const wrapper = render(DynamicRenderer, {
            props: {
                render: true
            }
        });

        expect(wrapper.getByText('true')).toBeDefined();
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render inside specified tag', () => {
        const { container } = render(DynamicRenderer, {
            props: {
                tag: 'span',
                render: 'Just a text'
            }
        });

        const spanElement = container.querySelector('span');
        expect(spanElement).not.toBeNull();
        expect(spanElement!.textContent).toBe('Just a text');
    });
});
