import { shallowMount } from '@vue/test-utils';
import { IBadge } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IBadge', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IBadge);
        });

        it('should be named correctly', () => {
            expect(IBadge.name).toEqual('IBadge');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
