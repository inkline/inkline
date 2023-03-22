import { render } from '@testing-library/vue';
import { IButton } from '@inkline/inkline/components/IButton';
import { ref } from 'vue';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { FormGroupKey } from '@inkline/inkline/components/IFormGroup/mixin';
import { ButtonGroupKey } from '@inkline/inkline/components/IButtonGroup/mixin';
import { FormKey } from '@inkline/inkline/components/IForm/mixin';

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
            const wrapper = render(IButton, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

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
                    '-active',
                    '-block',
                    '-circle',
                    '-disabled',
                    '-link',
                    '-outline'
                );
            });

            describe('tabindex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(IButton, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(IButton, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '0');
                });
            });

            describe('disabled', () => {
                it('should be disabled if disabled', () => {
                    const wrapper = render(IButton, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });

                it('should be disabled if buttonGroup is disabled', () => {
                    const wrapper = render(IButton, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [ButtonGroupKey as symbol]: {
                                    disabled: ref(true)
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });

                it('should be disabled if form is disabled', () => {
                    const wrapper = render(IButton, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [FormKey as symbol]: {
                                    disabled: ref(true)
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });

                it('should be disabled if formGroup is disabled', () => {
                    const wrapper = render(IButton, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [FormGroupKey as symbol]: {
                                    disabled: ref(true)
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });
            });
        });

        describe('role', () => {
            it('should provide no role for button elements', () => {
                const wrapper = render(IButton, {
                    props: {
                        tag: 'button'
                    },
                    global: {
                        provide: {
                            [InklineKey as symbol]: createInkline()
                        }
                    }
                });
                expect(wrapper.container.firstChild).not.toHaveAttribute('role', 'button');
            });

            it('should provide role="button" for non-button and input tags', () => {
                const wrapper = render(IButton, {
                    props: {
                        tag: 'a'
                    },
                    global: {
                        provide: {
                            [InklineKey as symbol]: createInkline()
                        }
                    }
                });
                expect(wrapper.container.firstChild).toHaveAttribute('role', 'button');
            });
        });
    });
});
