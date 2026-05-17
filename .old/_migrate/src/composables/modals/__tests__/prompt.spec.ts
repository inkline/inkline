import { defineComponent, h } from 'vue';
import { fireEvent, render } from '@testing-library/vue';
import { usePrompt } from '@inkline/inkline/composables/modals';
import { Inkline } from '@inkline/inkline/plugin';

const TestComponent = defineComponent({
    setup() {
        const prompt = usePrompt();

        async function onClick() {
            await prompt({
                title: 'Prompt Title',
                message: 'Prompt message',
                confirmButtonText: 'Confirm',
                confirmButtonProps: {
                    color: 'primary'
                },
                cancelButtonText: 'Cancel',
                cancelButtonProps: {
                    color: 'light'
                }
            });
        }

        return () => h('button', { onClick }, 'Button');
    }
});

describe('Composables', () => {
    describe('Modals', () => {
        describe('usePrompt', () => {
            it('should show prompt', async () => {
                const wrapper = render(TestComponent, {
                    global: {
                        plugins: [Inkline]
                    }
                });

                await fireEvent.click(wrapper.getByText('Button'));

                expect(wrapper.getByText('Prompt Title')).toBeInTheDocument();
                expect(wrapper.getByText('Prompt message')).toBeInTheDocument();
                expect(document.querySelector('form')).toBeInTheDocument();
                expect(document.querySelector('input[name="input"]')).toBeInTheDocument();
                expect(wrapper.getByText('Confirm')).toBeInTheDocument();
                expect(wrapper.getByText('Cancel')).toBeInTheDocument();
            });
        });
    });
});
