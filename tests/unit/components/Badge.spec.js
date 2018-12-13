import { shallowMount } from '@vue/test-utils';
import Badge from '../../../src/components/Badge';

describe('Components', () => {
    describe('Badge', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Badge);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
