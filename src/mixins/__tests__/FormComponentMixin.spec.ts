import { FormComponentMixin } from '@inkline/inkline/mixins';
import { render } from '@testing-library/vue';
import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';

describe('mixins', () => {
    describe('FormComponentMixin', () => {
        const Component = {
            name: 'FormComponent',
            mixins: [FormComponentMixin],
            template: '<input />'
        };

        it('should render correctly', () => {
            const wrapper = render(Component);

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('isDisabled', () => {
                it('should be true if disabled', () => {
                    const wrapper = createMockInstance(FormComponentMixin);
                    wrapper.disabled = true;

                    expect(wrapper.isDisabled).toEqual(true);
                });

                it('should be true if form.isDisabled', () => {
                    const wrapper = createMockInstance(FormComponentMixin, {
                        inject: {
                            form: {
                                isDisabled: true
                            }
                        }
                    });

                    expect(wrapper.isDisabled).toEqual(true);
                });

                it('should be true if formGroup.isDisabled', () => {
                    const wrapper = createMockInstance(FormComponentMixin, {
                        inject: {
                            formGroup: {
                                isDisabled: true
                            }
                        }
                    });

                    expect(wrapper.isDisabled).toEqual(true);
                });
            });

            describe('isReadonly', () => {
                it('should be true if disabled', () => {
                    const wrapper = createMockInstance(FormComponentMixin);
                    wrapper.readonly = true;

                    expect(wrapper.isReadonly).toEqual(true);
                });

                it('should be true if form.isReadonly', () => {
                    const wrapper = createMockInstance(FormComponentMixin, {
                        inject: {
                            form: {
                                isReadonly: true
                            }
                        }
                    });

                    expect(wrapper.isReadonly).toEqual(true);
                });

                it('should be true if formGroup.isReadonly', () => {
                    const wrapper = createMockInstance(FormComponentMixin, {
                        inject: {
                            formGroup: {
                                isReadonly: true
                            }
                        }
                    });

                    expect(wrapper.isReadonly).toEqual(true);
                });
            });

            describe('parent', () => {
                it('should be formGroup if formGroup instantiated', () => {
                    const formGroup = {
                        $: true
                    };
                    const wrapper = createMockInstance(FormComponentMixin, {
                        inject: {
                            formGroup
                        }
                    });

                    expect(wrapper.parent).toEqual(formGroup);
                });

                it('should be form if formGroup not instantiated', () => {
                    const form = {};
                    const formGroup = {
                        $: false
                    };
                    const wrapper = createMockInstance(FormComponentMixin, {
                        inject: {
                            formGroup,
                            form
                        }
                    });

                    expect(wrapper.parent).toEqual(form);
                });
            });

            describe('schema', () => {
                it('should be parent schema if name not provided', () => {
                    const formGroup = {
                        $: true,
                        schema: {}
                    };
                    const wrapper = createMockInstance(FormComponentMixin, {
                        inject: {
                            formGroup
                        }
                    });
                    wrapper.name = '';

                    expect(wrapper.schema).toEqual(formGroup.schema);
                });

                it('should be default schema if name and parent schema not provided', () => {
                    const formGroup = {
                        $: true
                    };
                    const wrapper = createMockInstance(FormComponentMixin, {
                        inject: {
                            formGroup
                        }
                    });
                    wrapper.name = '';

                    expect(wrapper.schema).toEqual({});
                });

                it('should get schema using name path if name provided', () => {
                    const formGroup = {
                        $: true,
                        schema: {
                            field: {}
                        }
                    };
                    const wrapper = createMockInstance(FormComponentMixin, {
                        inject: {
                            formGroup
                        }
                    });
                    wrapper.name = 'field';

                    expect(wrapper.schema).toEqual(formGroup.schema.field);
                });
            });
        });
    });
});
