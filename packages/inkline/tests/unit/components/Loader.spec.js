import { shallowMount } from '@vue/test-utils';
import Loader from '@inkline/inkline/src/components/Loader';

describe('Components', () => {
    describe('Loader', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Loader);
        });

        it('should be named correctly', () => {
            expect(Loader.name).toEqual('ILoader');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('count', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.count).toBeDefined();
                    expect(wrapper.vm.count).toEqual(12);
                });
            });
        });
    });
});
