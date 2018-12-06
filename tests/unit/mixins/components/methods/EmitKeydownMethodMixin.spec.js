import { mount } from '@vue/test-utils'

import EmitKeydownMethodMixin from 'inkline/mixins/components/methods/EmitKeydownMethodMixin';

describe('Mixins', () => {
    describe('EmitKeydownMethodMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [ EmitKeydownMethodMixin ]
            });
        });

        describe('methods', () => {
            describe('emitKeydown()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitKeydown).toBeDefined();
                });

                it('should emit "keydown" event', () => {
                    wrapper.vm.emitKeydown(true);

                    expect(wrapper.emitted().keydown).toBeTruthy();
                    expect(wrapper.emitted().keydown.length).toBe(1);
                    expect(wrapper.emitted().keydown[0]).toEqual([true]);
                });
            });

            describe('emitKeyup()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitKeyup).toBeDefined();
                });

                it('should emit "keyup" event', () => {
                    wrapper.vm.emitKeyup(true);

                    expect(wrapper.emitted().keyup).toBeTruthy();
                    expect(wrapper.emitted().keyup.length).toBe(1);
                    expect(wrapper.emitted().keyup[0]).toEqual([true]);
                });
            });
        });
    });
});
