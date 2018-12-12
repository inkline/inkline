import { mount } from '@vue/test-utils';
import InputNumber from 'inkline/components/InputNumber';

describe('Components', () => {
    describe('InputNumber', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(InputNumber);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
