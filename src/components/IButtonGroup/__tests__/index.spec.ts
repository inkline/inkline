import { render } from '@testing-library/vue';
import { IButtonGroup } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IButtonGroup', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IButtonGroup.name).toEqual('IButtonGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(IButtonGroup, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IButtonGroup, {
                        props: {
                            vertical: true,
                            block: true,
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-vertical',
                        '-block',
                        '-disabled'
                    );
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
