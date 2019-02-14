import { mount } from '@vue/test-utils'

import EmitClickMethodMixin from '@inkline/inkline/mixins/components/methods/EmitClickMethodMixin';

describe('Mixins', () => {
    describe('EmitClickMethodMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [ EmitClickMethodMixin ]
            });
        });

        describe('methods', () => {
            describe('emitClick()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitClick).toBeDefined();
                });

                it('should emit "click" event', () => {
                    wrapper.vm.emitClick({});

                    expect(wrapper.emitted().click).toBeTruthy();
                    expect(wrapper.emitted().click.length).toBe(1);
                    expect(wrapper.emitted().click[0]).toEqual([{}]);
                });
            });
        });
    });
});
