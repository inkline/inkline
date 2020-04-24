import { mount } from '@vue/test-utils'

import SizePropertyMixin from '@inkline/inkline/src/mixins/properties/SizePropertyMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/providers/ClassesProviderMixin';

describe('Mixins', () => {
    describe('SizePropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [
                    SizePropertyMixin,
                    ClassesProviderMixin
                ]
            });
        });

        describe('props', () => {
            describe('size', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.size).toBeDefined();
                    expect(wrapper.vm.size).toEqual('');
                });
            });
        });

        describe('created()', () => {
            it('should add size class to classes provider', () => {
                expect(wrapper.vm.classesProvider).toBeDefined();
                expect(wrapper.vm.classesProvider.length).toEqual(1);
            });

            for (const size of ['sm', 'md', 'lg']) {
                it(`should set "-${size}" class if "size" prop is "${size}"`, () => {
                    wrapper.setProps({
                        size: size
                    });

                    expect(wrapper.vm.classesProvider[0]()).toEqual(`-${size}`);
                });
            }
        });
    });
});
