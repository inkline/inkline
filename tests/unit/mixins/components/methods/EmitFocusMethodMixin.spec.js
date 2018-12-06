import { mount } from '@vue/test-utils'

import EmitFocusMethodMixin from 'inkline/mixins/components/methods/EmitFocusMethodMixin';

describe('mixins', () => {
    describe('EmitFocusMethodMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [ EmitFocusMethodMixin ]
            });
        });

        describe('data', () => {
            describe('focused', () => {
                it('should be defined and set to false', () => {
                    expect(wrapper.vm.focused).toEqual(false);
                });
            });
        });

        describe('methods', () => {
            describe('emitFocus()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitFocus).toBeDefined();
                });

                it('should emit "focus" event', () => {
                    wrapper.vm.emitFocus({});

                    expect(wrapper.emitted().focus).toBeTruthy();
                    expect(wrapper.emitted().focus.length).toBe(1);
                    expect(wrapper.emitted().focus[0]).toEqual([{}]);
                });

                it('should set "focused" to true', () => {
                    expect(wrapper.vm.focused).toBe(false);
                    wrapper.vm.emitFocus();
                    expect(wrapper.vm.focused).toBe(true);
                });
            });

            describe('emitBlur()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitBlur).toBeDefined();
                });

                it('should emit "blur" event', () => {
                    wrapper.vm.emitBlur({});

                    expect(wrapper.emitted().blur).toBeTruthy();
                    expect(wrapper.emitted().blur.length).toBe(1);
                    expect(wrapper.emitted().blur[0]).toEqual([{}]);
                });

                it('should set "focused" to true', () => {
                    expect(wrapper.vm.focused).toBe(false);
                    wrapper.vm.emitFocus();
                    expect(wrapper.vm.focused).toBe(true);
                    wrapper.vm.emitBlur();
                    expect(wrapper.vm.focused).toBe(false);
                });
            });
        });
    });
});
