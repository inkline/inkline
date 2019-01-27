import { shallowMount } from '@vue/test-utils';
import Navbar from '@inkline/inkline/components/Navbar';

describe('Components', () => {
    describe('Navbar', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Navbar);
        });

        it('should be named correctly', () => {
            expect(Navbar.name).toEqual('INavbar');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('fluid', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.fluid).toBeDefined();
                    expect(wrapper.vm.fluid).toEqual(false);
                });
            });
        });
    });
});
