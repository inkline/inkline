import { render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { FormKey } from '@inkline/types';
import { ref } from 'vue';
import { FormError } from '../index';

describe('Components', () => {
    describe('FormError', () => {
        const props = {
            for: 'input'
        };

        it('should be named correctly', () => {
            expect(FormError.name).toEqual('FormError');
        });

        it('should render correctly', () => {
            const wrapper = render(FormError, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should get errors from schema using for prop', () => {
            const wrapper = render(FormError, {
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide(),
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
            const wrapper = render(FormError, {
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide(),
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
            const wrapper = render(FormError, {
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide(),
                        [FormKey as symbol]: {}
                    }
                },
                props
            });
            const errors = wrapper.container.querySelectorAll('li');

            expect(errors).toHaveLength(0);
        });

        it('should not show errors if no for prop', () => {
            const wrapper = render(FormError, {
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide(),
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

        it('should show errors by default if error errorCondition prop is empty', () => {
            const wrapper = render(FormError, {
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide(),
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
                    errorCondition: undefined
                }
            });
            const errors = wrapper.container.querySelectorAll('li');

            expect(errors).toHaveLength(1);
        });

        it('should show errors when touched if error errorCondition prop is touched', () => {
            const wrapper = render(FormError, {
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide(),
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
                    errorCondition: ['touched']
                }
            });
            const errors = wrapper.container.querySelectorAll('li');

            expect(errors).toHaveLength(1);
        });
    });
});
