import { mount } from '@vue/test-utils'

import NamePropertyMixin from '@inkline/inkline/src/mixins/forms/properties/NamePropertyMixin';

describe('Mixins', () => {
    describe('NamePropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                data() {
                    return {
                        schema: false
                    };
                },
                render() {},
                mixins: [
                    NamePropertyMixin,
                ]
            });
        });

        describe('computed', () => {
            describe('name()', () => {
                it('should be undefined', () => {
                    expect(wrapper.vm.name).not.toBeDefined();
                });

                it('should return name attribute if it exists', () => {
                    wrapper.setProps({
                        name: 'name'
                    });

                    expect(wrapper.vm.name).toEqual('name');
                });

                it('should be return schema name if it exists', () => {
                    wrapper.setData({
                        schema: { name: 'name' }
                    });

                    expect(wrapper.vm.name).toEqual('name');
                });
            });
        });
    });
});
