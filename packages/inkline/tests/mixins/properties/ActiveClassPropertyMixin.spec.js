import { mount } from '@vue/test-utils'

import ActiveClassPropertyMixin from '@inkline/inkline/src/mixins/properties/ActiveClassPropertyMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/providers/ClassesProviderMixin';

describe('Mixins', () => {
    describe('ActiveClassPropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                data() {
                    return { active: false }
                },
                mixins: [
                    ActiveClassPropertyMixin,
                    ClassesProviderMixin
                ]
            });
        });

        describe('props', () => {
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

            it('should set "-active" class if "active" data is true', () => {
                wrapper.setData({
                    active: true
                });

                expect(wrapper.vm.classesProvider[0]()).toEqual({ [wrapper.vm.activeClass]: true });
            });
        });
    });
});
