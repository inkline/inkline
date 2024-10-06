import { fireEvent, render } from '@testing-library/vue';
import { IAlert } from '../index';
import { createTestingInklineOptionsProvide } from '@inkline/devtools';

describe('Components', () => {
    describe('IAlert', () => {
        const props = {
            color: 'primary',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IAlert.name).toEqual('IAlert');
        });

        it('should render correctly', () => {
            const wrapper = render(IAlert, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IAlert, {
                        slots: {
                            icon: '<span />'
                        },
                        props: {
                            dismissible: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-dismissible',
                        '-with-icon'
                    );
                });
            });
        });

        describe('methods', () => {
            describe('dismiss()', () => {
                it('should hide the alert when clicking the dismiss button', async () => {
                    const wrapper = render(IAlert, {
                        props: {
                            dismissible: true,
                            modelValue: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toBeVisible();
                    const dismissButton = await wrapper.findByLabelText('Dismiss');
                    await fireEvent.click(dismissButton);
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                    expect(wrapper.container.firstChild).not.toBeVisible();
                });
            });
        });
    });
});
