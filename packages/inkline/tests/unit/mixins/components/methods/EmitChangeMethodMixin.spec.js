import { mount } from '@vue/test-utils'

import EmitChangeMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitChangeMethodMixin';

describe('Mixins', () => {
    describe('EmitChangeMethodMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [ EmitChangeMethodMixin ]
            });
        });

        describe('methods', () => {
            describe('emitChange()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitChange).toBeDefined();
                });

                it('should emit "change" event', () => {
                    wrapper.vm.emitChange({ target: { value: true }});

                    expect(wrapper.emitted().change).toBeTruthy();
                    expect(wrapper.emitted().change.length).toBe(1);
                    expect(wrapper.emitted().change[0]).toEqual([true]);
                });
            });
        });
    });
});
