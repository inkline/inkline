import { mount } from '@vue/test-utils';
import { IAlert } from '@inkline/inkline/components';
import { Placeholder } from '@inkline/inkline/__mocks__';

describe('Components', () => {
    describe('IAlert', () => {
        const props = {
            color: 'primary',
            size: 'md'
        };

        const wrapper = mount(IAlert, {
            props,
            slots: {
                icon: Placeholder
            }
        });

        it('should be named correctly', () => {
            expect(IAlert.__name).toEqual('IAlert');
        });

        it('should render correctly', () => {
            expect(wrapper.exists()).toBeTruthy();
            expect(wrapper.element).toMatchSnapshot();
        });

        describe('styling', () => {
            it('should add classes based on props', async () => {
                await wrapper.setProps({
                    dismissible: true
                });
                expect(wrapper.element).toHaveClass(
                    `-${props.color}`,
                    `-${props.size}`,
                    '-dismissible',
                    '-with-icon'
                );
            });
        });

        describe('functionality', () => {
            it('should hide the alert when the dismiss button is clicked', async () => {
                await wrapper.setProps({ modelValue: true, dismissible: true });
                expect(wrapper.isVisible()).toBe(true);
                await wrapper.find('span.dismiss').trigger('click');
                expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                expect(wrapper.isVisible()).toBe(false);
            });
        });
    });
});
