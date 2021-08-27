import { render } from '@testing-library/vue';
import { IButton, IButtonGroup } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IButton', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IButton.name).toEqual('IButton');
        });

        it('should render correctly', () => {
            const wrapper = render(IButton, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IButton, {
                        props: {
                            active: true,
                            block: true,
                            circle: true,
                            disabled: true,
                            link: true,
                            outline: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-active',
                        '-block',
                        '-circle',
                        '-disabled',
                        '-link',
                        '-outline'
                    );
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(IButton, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(IButton, { props });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '1');
                });
            });

            describe('isDisabled', () => {
                it('should be disabled if disabled', () => {
                    const wrapper = render(IButtonGroup, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });

                it('should be disabled if buttonGroup is disabled', () => {
                    const wrapper = render(IButtonGroup, {
                        global: {
                            provide: {
                                buttonGroup: {
                                    disabled: true
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });

                it('should be disabled if form is disabled', () => {
                    const wrapper = render(IButtonGroup, {
                        global: {
                            provide: {
                                form: {
                                    disabled: true
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });

                it('should be disabled if formGroup is disabled', () => {
                    const wrapper = render(IButtonGroup, {
                        global: {
                            provide: {
                                formGroup: {
                                    disabled: true
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });
            });
        });
    });
});
