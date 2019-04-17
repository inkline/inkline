import { shallowMount } from '@vue/test-utils';
import ListGroupItem from '@inkline/inkline/src/components/ListGroupItem';

describe('Components', () => {
    describe('NavItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ListGroupItem);
        });

        it('should be named correctly', () => {
            expect(ListGroupItem.name).toEqual('IListGroupItem');
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
