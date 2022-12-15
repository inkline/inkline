import { mount } from '@vue/test-utils'

import EmitInputMethodMixin from '@inkline/inkline/src/mixins/methods/EmitInputMethodMixin';

describe('Mixins', () => {
    describe('EmitInputMethodMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [ EmitInputMethodMixin ]
            });
        });

        describe('methods', () => {
            describe('emitInput()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitInput).toBeDefined();
                });

                it('should emit "input" event', () => {
                    wrapper.vm.emitInput(true);

                    expect(wrapper.emitted().input).toBeTruthy();
                    expect(wrapper.emitted().input.length).toBe(1);
                    expect(wrapper.emitted().input[0]).toEqual([true]);
                });
            });
        });
    });
});
