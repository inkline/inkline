import { defineComponent, h } from 'vue';
import { fireEvent, render } from '@testing-library/vue';
import { useAlert } from '../useAlert';
import { ModalContainer } from '../../components';

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

        return () => h('div', {}, [h(ModalContainer), h('button', { onClick }, 'Button')]);
    }
});

describe('Composables', () => {
    describe('Modals', () => {
        describe('useAlert', () => {
            it('should show alert', async () => {
                const wrapper = render(TestComponent);

                await fireEvent.click(wrapper.getByText('Button'));

                expect(wrapper.getByText('Alert Title')).toBeInTheDocument();
                expect(wrapper.getByText('Alert message')).toBeInTheDocument();
                expect(wrapper.getByText('Confirm')).toBeInTheDocument();
            });
        });
    });
});
