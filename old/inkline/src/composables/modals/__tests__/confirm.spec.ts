import { defineComponent, h } from 'vue';
import { fireEvent, render } from '@testing-library/vue';
import { useConfirm } from '@inkline/inkline/composables/modals';
import { Inkline } from '@inkline/inkline/plugin';

const TestComponent = defineComponent({
    setup() {
        const confirm = useConfirm();

        async function onClick() {
            await confirm({
                title: 'Confirm Title',
                message: 'Confirm message',
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
        describe('useConfirm', () => {
            it('should show confirm', async () => {
                const wrapper = render(TestComponent, {
                    global: {
                        plugins: [Inkline]
                    }
                });

                await fireEvent.click(wrapper.getByText('Button'));

                expect(wrapper.getByText('Confirm Title')).toBeInTheDocument();
                expect(wrapper.getByText('Confirm message')).toBeInTheDocument();
                expect(wrapper.getByText('Confirm')).toBeInTheDocument();
                expect(wrapper.getByText('Cancel')).toBeInTheDocument();
            });
        });
    });
});
