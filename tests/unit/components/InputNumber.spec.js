import { shallowMount } from '@vue/test-utils';
import InputNumber from 'inkline/components/InputNumber';

describe('Components', () => {
    describe('InputNumber', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(InputNumber);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
