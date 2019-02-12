import { shallowMount } from '@vue/test-utils';
import FormError from '@inkline/inkline/components/FormError';

describe('Components', () => {
    describe('FormError', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(FormError);
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
                it('should add schema error messages to errors array', () => {
                    wrapper.setProps({
                        schema: {
                            invalid: false
                        }
                    });

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


                    expect(wrapper.vm.errors).toEqual(['a', 'b']);
                });
            });
        });

        describe('methods', () => {
            describe('clearErrors()', () => {
                it('should clear error messages', () => {
                    wrapper.setData({ errors: ['a', 'b', 'c'] });
                    wrapper.clearErrors();

                    expect(wrapper.vm.errors).toEqual([]);
                });
            });
        });
    });
});
