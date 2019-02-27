import { mount } from '@vue/test-utils'

import ClickInputRefMethodMixin from '@inkline/inkline/src/mixins/forms/methods/ClickInputRefMethodMixin';

describe('Mixins', () => {
    describe('ClickInputRefMethodMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                props: {
                    isDisabled: false,
                    isReadonly: false
                },
                mixins: [ ClickInputRefMethodMixin ],
                template: `
                    <div>
                        <input ref="input" />
                    </div>
                `
            });
        });

        describe('methods', () => {
            describe('clickInputRef()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.clickInputRef).toBeDefined();
                });

                it('should call "click" method on "input" ref', () => {
                    const spy = jest.spyOn(wrapper.vm.$refs.input, 'click');

                    wrapper.vm.clickInputRef();

                    expect(spy).toHaveBeenCalled();
                });

                it('should not call "click" method if component is disabled', () => {
                    const spy = jest.spyOn(wrapper.vm.$refs.input, 'click');

                    wrapper.setProps({
                        isDisabled: true
                    });

                    wrapper.vm.clickInputRef();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should not call "click" method if component is readonly', () => {
                    const spy = jest.spyOn(wrapper.vm.$refs.input, 'click');

                    wrapper.setProps({
                        isReadonly: true
                    });

                    wrapper.vm.clickInputRef();

                    expect(spy).not.toHaveBeenCalled();
                });
            });
        });
    });
});
