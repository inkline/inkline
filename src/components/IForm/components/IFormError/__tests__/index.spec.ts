import { render } from '@testing-library/vue';
import { IFormError } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IFormError', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IFormError.name).toEqual('IFormError');
        });

        it('should render correctly', () => {
            const wrapper = render(IFormError, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('parent', () => {
                it('should be equal to formGroup if formGroup', () => {
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                formGroup: {
                                    $: true,
                                    schema: {
                                        errors: [
                                            { message: 'Error' }
                                        ]
                                    }
                                }
                            }
                        },
                        props
                    });
                    const errors = wrapper.container.querySelectorAll('li');

                    expect(errors).toHaveLength(1);
                });

                it('should be equal to form if form', () => {
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                form: {
                                    schema: {
                                        errors: [
                                            { message: 'Error' }
                                        ]
                                    }
                                }
                            }
                        },
                        props
                    });
                    const errors = wrapper.container.querySelectorAll('li');

                    expect(errors).toHaveLength(1);
                });
            });

            describe('schema', () => {
                it('should use for and schema if provided', () => {
                    const forName = 'input';
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                form: {
                                    schema: {
                                        [forName]: {
                                            errors: [
                                                { message: 'Error' }
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        props: {
                            for: forName,
                            ...props
                        }
                    });
                    const errors = wrapper.container.querySelectorAll('li');

                    expect(errors).toHaveLength(1);
                });

                it('should use for if provided', () => {
                    const forName = 'input';
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                form: {}
                            }
                        },
                        props: {
                            for: forName,
                            ...props
                        }
                    });
                    const errors = wrapper.container.querySelectorAll('li');

                    expect(errors).toHaveLength(0);
                });

                it('should be parent schema if no for provided', () => {
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                form: {
                                    schema: {
                                        errors: [
                                            { message: 'Error' }
                                        ]
                                    }
                                }
                            }
                        },
                        props
                    });
                    const errors = wrapper.container.querySelectorAll('li');

                    expect(errors).toHaveLength(1);
                });

                it('should fallback if no for and schema provided', () => {
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                form: {}
                            }
                        },
                        props
                    });
                    const errors = wrapper.container.querySelectorAll('li');

                    expect(errors).toHaveLength(0);
                });
            });

            describe('errors', () => {
                it('should be fallback if schema doesn\'t have errors', () => {
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                form: {
                                    schema: {}
                                }
                            }
                        },
                        props
                    });
                    const errors = wrapper.container.querySelectorAll('li');

                    expect(errors).toHaveLength(0);
                });
            });

            describe('isVisible', () => {
                it('should not be visible if visible condition not specified', () => {
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                form: {
                                    schema: {}
                                }
                            }
                        },
                        props: {
                            visible: null,
                            ...props
                        }
                    });
                    const errorList = wrapper.container.querySelector('ul');

                    expect(errorList).toBeNull();
                });

                it('should not be visible if not touched, dirty and invalid', () => {
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                form: {
                                    schema: {}
                                }
                            }
                        },
                        props
                    });
                    const errorList = wrapper.container.querySelector('ul');

                    expect(errorList).toBeNull();
                });

                it('should be visible if touched, dirty and invalid', () => {
                    const wrapper = render(IFormError, {
                        global: {
                            provide: {
                                form: {
                                    schema: {
                                        touched: true,
                                        dirty: true,
                                        invalid: true,
                                        errors: [
                                            { message: 'Error' }
                                        ]
                                    }
                                }
                            }
                        },
                        props
                    });
                    const errorList = wrapper.container.querySelector('ul');

                    expect(errorList).toBeVisible();
                });
            });
        });
    });
});
