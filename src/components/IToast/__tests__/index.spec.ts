import { fireEvent, render } from '@testing-library/vue';
import { IToast } from '@inkline/inkline/components';
import { createInkline, Placeholder } from '@inkline/inkline/__mocks__';
import { InklineKey } from '@inkline/inkline/plugin';

describe('Components', () => {
    describe('IToast', () => {
        const props = {
            color: 'primary',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IToast.name).toEqual('IToast');
        });

        it('should render correctly', () => {
            const wrapper = render(IToast, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IToast, {
                        slots: {
                            icon: [Placeholder]
                        },
                        props: {
                            dismissible: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
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
                it('should hide the toast when clicking the dismiss button', async () => {
                    const wrapper = render(IToast, {
                        props: {
                            dismissible: true,
                            modelValue: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toBeVisible();
                    const dismissButton = await wrapper.findByLabelText('Dismiss');
                    await fireEvent.click(dismissButton);
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                });
            });
        });
    });
});
