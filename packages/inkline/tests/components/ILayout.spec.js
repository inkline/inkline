import { shallowMount } from '@vue/test-utils';
import { ILayout } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ILayout', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ILayout);
        });

        it('should be named correctly', () => {
            expect(ILayout.name).toEqual('ILayout');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('vertical', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.vertical).toBeDefined();
                    expect(wrapper.vm.vertical).toEqual(false);
                });
            });
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
