import { render } from '@testing-library/vue';
import { ref } from 'vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { Button } from '../index';
import { ButtonGroupKey, FormKey, FormGroupKey } from '@inkline/types';

describe('Components', () => {
    describe('Button', () => {
        const stubs = {
            Linkable: true
        };

        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(Button.name).toEqual('Button');
        });

        it('should render correctly', () => {
            const wrapper = render(Button, {
                props,
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('classes', () => {
            it('should add classes based on props', () => {
                const wrapper = render(Button, {
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
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Button, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(Button, {
                        props,
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '0');
                });
            });

            describe('disabled', () => {
                it('should be disabled if disabled', () => {
                    const wrapper = render(Button, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });

                it('should be disabled if buttonGroup is disabled', () => {
                    const wrapper = render(Button, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(Button, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(Button, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                const wrapper = render(Button, {
                    props: {
                        tag: 'button'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).not.toHaveAttribute('role', 'button');
            });

            it('should provide no role for input elements', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'input'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).not.toHaveAttribute('role', 'button');
            });

            it('should provide role="button" for non-button tags', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'a'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).toHaveAttribute('role', 'button');
            });
        });

        describe('type', () => {
            it('should provide type="button" for semantic button elements with no default type', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'button'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).toHaveAttribute('type', 'button');
            });

            it('should provide type="button" for semantic button elements with type="button"', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'button',
                        type: 'button'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).toHaveAttribute('type', 'button');
            });

            it('should provide type="submit" for semantic button elements with type="submit"', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'button',
                        type: 'submit'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).toHaveAttribute('type', 'submit');
            });

            it('should provide type="reset" for semantic button elements with type="reset"', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'button',
                        type: 'reset'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).toHaveAttribute('type', 'reset');
            });

            it('should provide type="button" for semantic input elements with type="button"', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'input',
                        type: 'button'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).toHaveAttribute('type', 'button');
            });

            it('should provide type="submit" for semantic input elements with type="submit"', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'input',
                        type: 'submit'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).toHaveAttribute('type', 'submit');
            });

            it('should provide type="reset" for semantic input elements with type="reset"', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'input',
                        type: 'reset'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).toHaveAttribute('type', 'reset');
            });

            it('should not provide type="button" for non-button and input tags', () => {
                const wrapper = render(Button, {
                    props: {
                        tag: 'a',
                        type: 'button'
                    },
                    global: {
                        stubs,
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                expect(wrapper.container.firstChild).not.toHaveAttribute('type', 'button');
            });
        });
    });
});
