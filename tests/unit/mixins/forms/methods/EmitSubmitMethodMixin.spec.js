import { mount } from '@vue/test-utils'

import EmitSubmitMethodMixin from '@inkline/inkline/mixins/forms/methods/EmitSubmitMethodMixin';

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
                    const event = { preventDefault() {} };

                    wrapper.vm.emitSubmit(event);

                    expect(wrapper.emitted().submit).toBeTruthy();
                    expect(wrapper.emitted().submit.length).toBe(1);
                    expect(wrapper.emitted().submit[0]).toEqual([event]);
                });
            });
        });
    });
});
