import { shallowMount } from '@vue/test-utils';
import { ILoader } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ILoader', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ILoader);
        });

        it('should be named correctly', () => {
            expect(ILoader.name).toEqual('ILoader');
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
