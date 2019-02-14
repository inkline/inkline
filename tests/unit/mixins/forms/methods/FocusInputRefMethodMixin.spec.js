import { mount } from '@vue/test-utils'

import FocusInputRefMethodMixin from '@inkline/inkline/mixins/forms/methods/FocusInputRefMethodMixin';

describe('Mixins', () => {
    describe('FocusInputRefMethodMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                props: {
                    isDisabled: false,
                    isReadonly: false
                },
                mixins: [ FocusInputRefMethodMixin ],
                template: `
                    <div>
                        <input ref="input" />
                    </div>
                `
            });
        });

        describe('methods', () => {
            describe('focusInputRef()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.focusInputRef).toBeDefined();
                });

                it('should call "focus" method on "input" ref', () => {
                    const spy = jest.spyOn(wrapper.vm.$refs.input, 'focus');

                    wrapper.vm.focusInputRef();

                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });
});
