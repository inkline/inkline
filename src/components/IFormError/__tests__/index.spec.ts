import { render } from '@testing-library/vue';
import { IFormError } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { FormKey } from '@inkline/inkline/components/IForm/mixin';
import { ref } from 'vue';

describe('Components', () => {
    describe('IFormError', () => {
        const props = {
            for: 'input'
        };

        it('should be named correctly', () => {
            expect(IFormError.name).toEqual('IFormError');
        });

        it('should render correctly', () => {
            const wrapper = render(IFormError, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should get errors from schema using for prop', () => {
            const wrapper = render(IFormError, {
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline(),
                        [FormKey as symbol]: {
                            schema: ref({
                                input: {
                                    touched: true,
                                    dirty: true,
                                    invalid: true,
                                    errors: [{ message: 'Error' }]
                                }
                            })
                        }
                    }
                },
                props
            });
            const errors = wrapper.container.querySelectorAll('li');

            expect(errors).toHaveLength(1);
        });

        it('should not show errors if schema is valid', () => {
            const wrapper = render(IFormError, {
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline(),
                        [FormKey as symbol]: {
                            schema: ref({
                                input: {
                                    touched: true,
                                    dirty: true,
                                    invalid: false,
                                    errors: []
                                }
                            })
                        }
                    }
                },
                props
            });
            const errors = wrapper.container.querySelectorAll('li');

            expect(errors).toHaveLength(0);
        });

        it('should not show errors if no schema present', () => {
            const wrapper = render(IFormError, {
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline(),
                        [FormKey as symbol]: {}
                    }
                },
                props
            });
            const errors = wrapper.container.querySelectorAll('li');

            expect(errors).toHaveLength(0);
        });

        it('should not show errors if no for prop', () => {
            const wrapper = render(IFormError, {
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline(),
                        [FormKey as symbol]: {
                            schema: ref({
                                input: {
                                    touched: true,
                                    dirty: true,
                                    invalid: true,
                                    errors: [{ message: 'Error' }]
                                }
                            })
                        }
                    }
                },
                props: {
                    ...props,
                    for: undefined
                }
            });
            const errors = wrapper.container.querySelectorAll('li');

            expect(errors).toHaveLength(0);
        });

        it('should show errors by default if error visible prop is empty', () => {
            const wrapper = render(IFormError, {
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline(),
                        [FormKey as symbol]: {
                            schema: ref({
                                input: {
                                    touched: false,
                                    dirty: false,
                                    invalid: true,
                                    errors: [{ message: 'Error' }]
                                }
                            })
                        }
                    }
                },
                props: {
                    ...props,
                    visible: undefined
                }
            });
            const errors = wrapper.container.querySelectorAll('li');

            expect(errors).toHaveLength(1);
        });

        it('should show errors when touched if error visible prop is touched', () => {
            const wrapper = render(IFormError, {
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline(),
                        [FormKey as symbol]: {
                            schema: ref({
                                input: {
                                    touched: true,
                                    dirty: false,
                                    invalid: true,
                                    errors: [{ message: 'Error' }]
                                }
                            })
                        }
                    }
                },
                props: {
                    ...props,
                    visible: ['touched']
                }
            });
            const errors = wrapper.container.querySelectorAll('li');

            expect(errors).toHaveLength(1);
        });
    });
});
