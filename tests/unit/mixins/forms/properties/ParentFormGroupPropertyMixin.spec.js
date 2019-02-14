import { mount } from '@vue/test-utils'

import ParentFormGroupPropertyMixin from '@inkline/inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';

describe('Mixins', () => {
    describe('ParentFormGroupPropertyMixin', () => {
        let wrapper;
        let nestedWrapper;
        let child;
        let nestedChild;

        const IFormItem = {
            name: 'IFormItem',
            render() {},
            mixins: [
                ParentFormGroupPropertyMixin,
            ]
        };

        const INestedFormItem = {
            name: 'INestedFormItem',
            template: '<div><slot><i-form-item /></slot></div>',
            components: {
                IFormItem
            }
        };

        const IFormGroup = {
            name: 'IFormGroup',
            template: `
                    <div>
                        <slot></slot>
                    </div>
                `
        };

        beforeEach(() => {
            wrapper = mount(IFormItem);
            nestedWrapper = mount(IFormGroup, {
                slots: {
                    default: [ IFormItem, INestedFormItem ]
                }
            });

            child = nestedWrapper.vm.$children[0];
            nestedChild = nestedWrapper.vm.$children[1].$children[0];
        });

        describe('data', () => {
            describe('parentFormGroupName', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.parentFormGroupName).toBeDefined();
                    expect(wrapper.vm.parentFormGroupName).toEqual('IFormGroup');
                });
            });
        });

        describe('computed', () => {
            describe('parentFormGroup', () => {
                it('should be defined', () => {
                    expect(wrapper.vm).toHaveProperty('parentFormGroup');
                });

                it('should return undefined if parent doesn\'t exist', () => {
                    expect(wrapper.vm.parentFormGroup).not.toBeDefined();
                });

                it('should return nearest parent as immediate child', () => {
                    expect(child.parentFormGroup).toEqual(nestedWrapper.vm);
                });

                it('should return nearest parent as nested child', () => {
                    expect(nestedChild.parentFormGroup).toEqual(nestedWrapper.vm);
                });
            });

            describe('isGrouped', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.isGrouped).toBeDefined();
                });

                it('should be false if parent doesn\'t exist', () => {
                    expect(wrapper.vm.isGrouped).toEqual(false);
                });

                it('should return true if immediate parent group exists', () => {
                    expect(child.isGrouped).toEqual(true);
                });

                it('should return true if parent group exists', () => {
                    expect(nestedChild.isGrouped).toEqual(true);
                });
            });
        });
    });
});
