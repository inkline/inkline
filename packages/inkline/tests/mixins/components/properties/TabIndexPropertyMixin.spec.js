import { mount } from '@vue/test-utils'

import AttributesProviderMixin from '@inkline/inkline/src/mixins/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/providers/ClassesProviderMixin';
import DisabledPropertyMixin from '@inkline/inkline/src/mixins/properties/DisabledPropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/src/mixins/properties/TabIndexPropertyMixin';

describe('Mixins', () => {
    describe('TabIndexPropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [
                    AttributesProviderMixin,
                    ClassesProviderMixin,
                    TabIndexPropertyMixin,
                    DisabledPropertyMixin
                ]
            });
        });

        describe('props', () => {
            describe('tabindex', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tabindex).toBeDefined();
                    expect(wrapper.vm.tabindex).toEqual(1);
                });
            });
        });

        describe('computed', () => {
            describe('tabIndex', () => {
                it('should return "tabindex" if not disabled', () => {
                    expect(wrapper.vm.tabIndex).toBeDefined();
                    expect(wrapper.vm.tabIndex).toEqual(wrapper.vm.tabindex);
                });

                it('should return "-1" if disabled', () => {
                    wrapper.setProps({
                        disabled: true
                    });

                    expect(wrapper.vm.tabIndex).toEqual(-1);
                });
            });
        });
    });
});
