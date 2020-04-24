import { shallowMount } from '@vue/test-utils';
import { IFormError } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IFormError', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IFormError, {
                propsData: {
                    schema: {
                        errors: [],
                        invalid: false
                    }
                }
            });
        });

        it('should be named correctly', () => {
            expect(IFormError.name).toEqual('IFormError');
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

                it('should not affect anything if schema is not invalid', (done) => {
                    expect(wrapper.vm.errors).toEqual([]);

                    wrapper.setProps({
                        schema: {
                            errors: {
                                errorA: 'a'
                            },
                            invalid: true
                        }
                    });

                    wrapper.vm.$nextTick(() => {
                        wrapper.setProps({
                            schema: {
                                errors: {},
                                invalid: false
                            }
                        });

                        wrapper.vm.$nextTick(() => {
                            expect(wrapper.vm.errors).toEqual([]);
                            done();
                        });
                    });
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
