import { mount } from '@vue/test-utils';
import { IBreadcrumbItem } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IBreadcrumbItem', () => {
        const wrapper = mount(IBreadcrumbItem);

        it('should be named correctly', () => {
            expect(IBreadcrumbItem.__name).toEqual('IBreadcrumbItem');
        });

        it('should render correctly', () => {
            expect(wrapper.exists()).toBeTruthy();
            expect(wrapper.element).toMatchSnapshot();
        });

        describe('styling', () => {
            it('should add classes based on props', async () => {
                await wrapper.setProps({
                    active: true,
                    disabled: true
                });
                expect(wrapper.element).toHaveClass('-active', '-disabled');
            });
        });

        describe('functionality', () => {
            describe('tabIndex', () => {
                it('should be -1 if disabled', async () => {
                    await wrapper.setProps({
                        disabled: true
                    });
                    const link = wrapper.find('a').element;
                    expect(link).toHaveAttribute('tabindex', '-1');
                });

                it('should be -1 if active', async () => {
                    await wrapper.setProps({
                        active: true,
                        disabled: false
                    });
                    const link = wrapper.find('a').element;
                    expect(link).toHaveAttribute('tabindex', '-1');
                });

                it('should be 0 otherwise', async () => {
                    await wrapper.setProps({
                        active: false,
                        disabled: false
                    });

                    const link = wrapper.find('a').element;
                    expect(link).toHaveAttribute('tabindex', '0');
                });
            });
        });

        describe('accessibility', () => {
            describe('aria-current', () => {
                it('should be location if active', async () => {
                    await wrapper.setProps({
                        active: true
                    });
                    const link = wrapper.find('a').element;
                    expect(link).toHaveAttribute('aria-current', 'location');
                });
            });
        });
    });
});
