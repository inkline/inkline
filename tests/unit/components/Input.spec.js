import { shallowMount } from '@vue/test-utils';
import Input from 'inkline/components/Input';

describe('Components', () => {
    describe('Input', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Input);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
