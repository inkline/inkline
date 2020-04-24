import { shallowMount } from '@vue/test-utils';
import { IListGroupItem } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('INavItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IListGroupItem);
        });

        it('should be named correctly', () => {
            expect(IListGroupItem.name).toEqual('IListGroupItem');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('tag', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tag).toBeDefined();
                    expect(wrapper.vm.tag).toEqual('div');
                });
            });
        });
    });
});
