import { mount } from '@vue/test-utils'

import EmitHoverMethodMixin from '@inkline/inkline/mixins/components/methods/EmitHoverMethodMixin';

describe('mixins', () => {
    describe('EmitHoverMethodMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [ EmitHoverMethodMixin ]
            });
        });

        describe('data', () => {
            describe('hovered', () => {
                it('should be defined and set to false', () => {
                    expect(wrapper.vm.hovered).toEqual(false);
                });
            });
        });

        describe('methods', () => {
            describe('emitMouseEnter()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitMouseEnter).toBeDefined();
                });

                it('should emit "mouseenter" event', () => {
                    wrapper.vm.emitMouseEnter({});

                    expect(wrapper.emitted().mouseenter).toBeTruthy();
                    expect(wrapper.emitted().mouseenter.length).toBe(1);
                    expect(wrapper.emitted().mouseenter[0]).toEqual([{}]);
                });

                it('should set "hovered" to true', () => {
                    expect(wrapper.vm.hovered).toBe(false);
                    wrapper.vm.emitMouseEnter();
                    expect(wrapper.vm.hovered).toBe(true);
                });
            });

            describe('emitMouseLeave()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitMouseLeave).toBeDefined();
                });

                it('should emit "mouseleave" event', () => {
                    wrapper.vm.emitMouseLeave({});

                    expect(wrapper.emitted().mouseleave).toBeTruthy();
                    expect(wrapper.emitted().mouseleave.length).toBe(1);
                    expect(wrapper.emitted().mouseleave[0]).toEqual([{}]);
                });

                it('should set "hovered" to true', () => {
                    expect(wrapper.vm.hovered).toBe(false);
                    wrapper.vm.emitMouseEnter();
                    expect(wrapper.vm.hovered).toBe(true);
                    wrapper.vm.emitMouseLeave();
                    expect(wrapper.vm.hovered).toBe(false);
                });
            });
        });
    });
});
