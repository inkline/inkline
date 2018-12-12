import { mount } from '@vue/test-utils';
import Row from 'inkline/components/Row';

describe('Components', () => {
    describe('Row', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Row);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
