import { render } from '@testing-library/vue';
import { IRenderResolver } from '@inkline/inkline/components/utils/IRenderResolver';
import { h, defineComponent, markRaw } from 'vue';

describe('Components', () => {
    describe('IRenderResolver', () => {
        it('should handle render function', () => {
            const props = {
                render: (ctx: { text: string }) => h('div', ctx.text),
                ctx: { text: 'Hello, world!' }
            };

            const wrapper = render(IRenderResolver, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should handle rendering as Component', async () => {
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

            const wrapper = await render(IRenderResolver, {
                props: {
                    render: markRaw(CustomComponent),
                    ctx: { text: 'Hello, object!' }
                }
            });

            expect(wrapper.getByText('Hello, object!')).toBeDefined();
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should handle rendering a string with interpolation', async () => {
            const wrapper = await render(IRenderResolver, {
                props: {
                    render: 'Hello, {{name}}!',
                    ctx: { name: 'John' }
                }
            });

            expect(wrapper.getByText('Hello, John!')).toBeDefined();
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should handle rendering a number', async () => {
            const wrapper = await render(IRenderResolver, {
                props: {
                    render: 42
                }
            });

            expect(wrapper.getByText('42')).toBeDefined();
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should handle rendering a boolean', async () => {
            const wrapper = await render(IRenderResolver, {
                props: {
                    render: true
                }
            });

            expect(wrapper.getByText('true')).toBeDefined();
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render inside specified tag', async () => {
            const { container } = await render(IRenderResolver, {
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
});
