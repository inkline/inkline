import { mount } from '@vue/test-utils'

import ActivePropertyMixin from '@inkline/inkline/src/mixins/properties/ActivePropertyMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/providers/ClassesProviderMixin';

describe('Mixins', () => {
    describe('ActivePropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [
                    ActivePropertyMixin,
                    ClassesProviderMixin
                ]
            });
        });

        describe('props', () => {
            describe('active', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.active).toBeDefined();
                    expect(wrapper.vm.active).toEqual(false);
                });
            });

            describe('activeClass', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.activeClass).toBeDefined();
                    expect(wrapper.vm.activeClass).toEqual('-active');
                });
            });
        });

        describe('created()', () => {
            it('should add "-active" class to classes provider', () => {
                expect(wrapper.vm.classesProvider).toBeDefined();
                expect(wrapper.vm.classesProvider.length).toEqual(1);
            });

            it('should set "-active" class if "active" prop is true', () => {
                wrapper.setProps({
                    active: true
                });

                expect(wrapper.vm.classesProvider[0]()).toEqual({ [wrapper.vm.activeClass]: true });
            });
        });
    });
});
