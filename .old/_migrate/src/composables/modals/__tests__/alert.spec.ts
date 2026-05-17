import { defineComponent, h } from 'vue';
import { fireEvent, render } from '@testing-library/vue';
import { useAlert } from '@inkline/inkline/composables/modals';
import { Inkline } from '@inkline/inkline/plugin';

const TestComponent = defineComponent({
    setup() {
        const alert = useAlert();

        async function onClick() {
            await alert({
                title: 'Alert Title',
                message: 'Alert message',
                confirmButtonText: 'Confirm',
                confirmButtonProps: {
                    color: 'primary'
                }
            });
        }

        return () => h('button', { onClick }, 'Button');
    }
});

describe('Composables', () => {
    describe('Modals', () => {
        describe('useAlert', () => {
            it('should show alert', async () => {
                const wrapper = render(TestComponent, {
                    global: {
                        plugins: [Inkline]
                    }
                });

                await fireEvent.click(wrapper.getByText('Button'));

                expect(wrapper.getByText('Alert Title')).toBeInTheDocument();
                expect(wrapper.getByText('Alert message')).toBeInTheDocument();
                expect(wrapper.getByText('Confirm')).toBeInTheDocument();
            });
        });
    });
});
