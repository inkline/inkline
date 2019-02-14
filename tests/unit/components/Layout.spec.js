import { shallowMount } from '@vue/test-utils';
import Layout from '@inkline/inkline/src/components/Layout';

describe('Components', () => {
    describe('Layout', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Layout);
        });

        it('should be named correctly', () => {
            expect(Layout.name).toEqual('ILayout');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes()', () => {
                it('should add "-vertical" class if "vertical" property is true', () => {
                    expect(wrapper.vm.classes).toEqual(expect.objectContaining([{ '-vertical': false }]));
                    wrapper.setProps({ vertical: true });
                    expect(wrapper.vm.classes).toEqual(expect.objectContaining([{ '-vertical': true }]));
                });
            });
        });
    });
});
