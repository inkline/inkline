import { mount } from '@vue/test-utils'

import LoadingPropertyMixin from '@inkline/inkline/src/mixins/properties/LoadingPropertyMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/providers/ClassesProviderMixin';

describe('Mixins', () => {
    describe('LoadingPropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [
                    LoadingPropertyMixin,
                    ClassesProviderMixin
                ]
            });
        });

        describe('props', () => {
            describe('loading', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.loading).toBeDefined();
                    expect(wrapper.vm.loading).toEqual(false);
                });
            });
        });

        describe('created()', () => {
            it('should add "-loading" class to classes provider', () => {
                expect(wrapper.vm.classesProvider).toBeDefined();
                expect(wrapper.vm.classesProvider.length).toEqual(1);
            });

            it('should set "-loading" class if "loading" prop is true', () => {
                wrapper.setProps({
                    loading: true
                });

                expect(wrapper.vm.classesProvider[0]()).toEqual({ '-loading': true });
            });
        });
    });
});
