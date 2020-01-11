import { shallowMount } from '@vue/test-utils';
import FormError from '@inkline/inkline/src/components/FormError';

describe('Components', () => {
    describe('FormError', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(FormError, {
                propsData: {
                    schema: {
                        errors: [],
                        invalid: false
                    }
                }
            });
        });

        it('should be named correctly', () => {
            expect(FormError.name).toEqual('IFormError');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('schema', () => {
                it('should be defined', () => {
                    expect(wrapper.vm).toHaveProperty('schema');
                });
            });
        });

        describe('data()', () => {
            describe('errors', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.errors).toBeDefined();
                    expect(wrapper.vm.errors).toEqual([]);
                });
            });
        });

        describe('watch', () => {
            describe('schema.invalid()', () => {
                it('should add schema error messages to errors array', (done) => {
                    expect(wrapper.vm.errors).toEqual([]);

                    wrapper.setProps({
                        schema: {
                            errors: {
                                errorA: 'a',
                                errorB: 'b'
                            },
                            invalid: true
                        }
                    });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.errors).toEqual(['a', 'b']);
                        done();
                    });
                });

                it('should not affect anything if schema is not invalid', () => {
                    expect(wrapper.vm.errors).toEqual([]);

                    wrapper.setProps({
                        schema: {
                            errors: {
                                errorA: 'a'
                            },
                            invalid: true
                        }
                    });

                    wrapper.setProps({
                        schema: {
                            errors: {},
                            invalid: false
                        }
                    });

                    expect(wrapper.vm.errors).toEqual([]);
                });
            });
        });

        describe('methods', () => {
            describe('clearErrors()', () => {
                it('should clear error messages', () => {
                    wrapper.setData({ errors: ['a', 'b', 'c'] });
                    wrapper.vm.clearErrors();

                    expect(wrapper.vm.errors).toEqual([]);
                });
            });
        });
    });
});
