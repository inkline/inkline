import { mount } from '@vue/test-utils'

import InjectParentFormProviderMixin from '@inkline/inkline/mixins/forms/providers/InjectParentFormProviderMixin';

describe('Mixins', () => {
    describe('InjectProviderMixin', () => {
        let wrapper;
        let injectWrapper;

        beforeEach(() => {
            const Child = {
                render() {},
                mixins: [
                    InjectParentFormProviderMixin,
                ]
            };

            wrapper = mount(Child);
            injectWrapper = mount({
                template: '<div><slot></slot></div>',
                provide: {
                    parentForm: true
                }
            }, {
                slots: {
                    default: [ Child ]
                }
            });
        });

        describe('inject', () => {
            describe('parentForm', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.parentForm).toBeDefined();
                    expect(wrapper.vm.parentForm).toEqual('');
                });

                it('should be provided by parent form', () => {
                    expect(injectWrapper.vm.$children[0].parentForm).toBeDefined();
                    expect(injectWrapper.vm.$children[0].parentForm).toEqual(true);
                });
            });
        });
    });
});
