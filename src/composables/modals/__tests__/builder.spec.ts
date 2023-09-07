/* eslint-disable vue/one-component-per-file */
import { defineComponent, h } from 'vue';
import { fireEvent, render } from '@testing-library/vue';
import { useModalBuilder } from '@inkline/inkline/composables/modals';
import { Inkline } from '@inkline/inkline/plugin';

const TestComponent = defineComponent({
    setup() {
        const builder = useModalBuilder();

        async function onClick() {
            await builder.show({
                header: 'Modal Header',
                icon: 'Icon',
                body: 'Modal message',
                footer: 'Modal Footer'
            });
        }

        return () => h('button', { onClick }, 'Button');
    }
});

const TestComponentWithVNodes = defineComponent({
    setup() {
        const builder = useModalBuilder();

        async function onClick() {
            await builder.show({
                header: h('div', ['Modal Header']),
                icon: h('div', ['Icon']),
                body: h('div', [
                    h('p', ['Modal message']),
                    h('ul', [
                        h('li', ['List item 1']),
                        h('li', ['List item 2']),
                        h('li', ['List item 3'])
                    ])
                ]),
                footer: h('div', ['Modal Footer'])
            });
        }

        return () => h('button', { onClick }, 'Button');
    }
});

describe('Composables', () => {
    describe('Modals', () => {
        describe('useModalBuilder', () => {
            it('should show modal', async () => {
                const wrapper = render(TestComponent, {
                    global: {
                        plugins: [Inkline]
                    }
                });

                await fireEvent.click(wrapper.getByText('Button'));

                expect(wrapper.getByText('Modal Header')).toBeInTheDocument();
                expect(wrapper.getByText('Icon')).toBeInTheDocument();
                expect(wrapper.getByText('Modal message')).toBeInTheDocument();
                expect(wrapper.getByText('Modal Footer')).toBeInTheDocument();
            });

            it('should show modal with vNodes', async () => {
                const wrapper = render(TestComponentWithVNodes, {
                    global: {
                        plugins: [Inkline]
                    }
                });

                await fireEvent.click(wrapper.getByText('Button'));

                expect(wrapper.getByText('Modal Header')).toBeInTheDocument();
                expect(wrapper.getByText('Icon')).toBeInTheDocument();
                expect(wrapper.getByText('Modal message')).toBeInTheDocument();
                expect(wrapper.getByText('List item 1')).toBeInTheDocument();
                expect(wrapper.getByText('List item 2')).toBeInTheDocument();
                expect(wrapper.getByText('List item 3')).toBeInTheDocument();
                expect(document.querySelectorAll('ul li')).toHaveLength(3);
                expect(wrapper.getByText('Modal Footer')).toBeInTheDocument();
            });
        });
    });
});
