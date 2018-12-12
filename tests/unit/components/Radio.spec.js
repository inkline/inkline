import { mount } from '@vue/test-utils';
import Radio from 'inkline/components/Radio';

describe('Components', () => {
    describe('Radio', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Radio);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
