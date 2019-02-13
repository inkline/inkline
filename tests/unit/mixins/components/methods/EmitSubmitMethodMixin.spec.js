import { mount } from '@vue/test-utils'

import EmitSubmitMethodMixin from '@inkline/inkline/mixins/components/methods/EmitSubmitMethodMixin';

describe('Mixins', () => {
    describe('EmitSubmitMethodMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [ EmitSubmitMethodMixin ]
            });
        });

        describe('methods', () => {
            describe('emitSubmit()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitSubmit).toBeDefined();
                });

                it('should emit "input" event', () => {
                    wrapper.vm.emitSubmit(true);

                    expect(wrapper.emitted().submit).toBeTruthy();
                    expect(wrapper.emitted().submit.length).toBe(1);
                    expect(wrapper.emitted().submit[0]).toEqual([true]);
                });
            });
        });
    });
});
